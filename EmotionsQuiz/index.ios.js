/**
 * Emotions Quiz React Native App
 * BSD License
 */
'use strict';

var styles = require('./stylesheets/MainStylesheet');
var React  = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableWithoutFeedback,
  AsyncStorage
} = React;
var {
  Button
} = require('./components/Button');

var emotionsData = require('./data/emotions.json');
var AnimationExperimental = require('AnimationExperimental');

function shuffle(o){
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

var Emotions = {
  getRandom : function ( tiers ) {
    var shuffled = shuffle( emotionsData );

    for ( var i = 0; i < emotionsData.length; i++ ) {
      if ( tiers.indexOf( emotionsData[i].tier ) !== -1 ) 
        return emotionsData[i];
    }
  },
  getParent : function ( emotion ) {
    var result = null;
    
    if ( emotion.parent ) {
      for ( var i = 0; i < emotionsData.length; i++ ) {
        var e = emotionsData[i];
        
        if ( emotion.parent === e.slug ) {
          return e;
        }
      }
    }
    
    return result;
  },
  getAncestor : function ( emotion ) {
    var e = emotion;
    
    while ( e.parent !== null ) {
      e = Emotions.getParent( e );
    }
    
    return e;
  },
  getWrongAncestors : function ( emotion ) {
    var wrong = [];
    for ( var i = 0; i < emotionsData.length; i++ ) {
      if ( emotionsData[i].slug !== emotion.slug &&
           emotionsData[i].tier === 0) {
        wrong.push( emotionsData[i] );
      }
    }

    var shuffled = shuffle(wrong);

    return shuffled.splice(0, 2);
  }
};

var HighScore = React.createClass({
  render: function () {
    return (
      <View style={styles.topScore}>
        <Text>
          <Text style={[styles.topScoreText, styles._baseThinText]}>
            Your High Score Is: {' '}
          </Text>
          <Text style={[styles.topScoreValue, styles._baseThinText]}>
            {this.props.highScore}
          </Text>
        </Text>
      </View>
    );
  }
});

var QuestionSlide = React.createClass({
  goHome : function () {
    this.props.navigator.popToTop();
  },
  goNextQuestion : function () {
    this.props.navigator.push({
      state: 'Question'
    });
  },
  onAnswered : function ( correct : Boolean ) {
    this.setState({
      modalWillShow : true,
      showModal : true,
      gotRight : correct
    });

    if ( correct ) {
      this.props.gotQuestionRight();
    } else {
      this.props.gotQuestionWrong();
    }
  },
  getInitialState : function () {
    var emotion = Emotions.getRandom([1,2]);
    var ancestor = Emotions.getAncestor( emotion );
    var ancestors = Emotions.getWrongAncestors( ancestor );

    var answers = shuffle([ancestor, ancestors[0], ancestors[1]]);

    return({
      question: emotion.readible,
      answerA: answers[0].readible,
      answerB: answers[1].readible,
      answerC: answers[2].readible,
      rightAnswer: ancestor.readible,
      modalWillShow : false,
      showModal : false,
      gotRight : false
    });
  },
  onAnswerA : function () {
    if ( this.state.answerA === this.state.rightAnswer ) {
      this.onAnswered( true );
      return;
    }
    this.onAnswered( false );
  },
  onAnswerB : function () {
    if ( this.state.answerB === this.state.rightAnswer ) {
      this.onAnswered( true );
      return;
    }
    this.onAnswered( false );
  },
  onAnswerC : function () {
    if ( this.state.answerC === this.state.rightAnswer ) {
      this.onAnswered( true );
      return;
    }
    this.onAnswered( false );
  },
  componentDidUpdate : function () {
    if ( this.state.modalWillShow ) {
      AnimationExperimental.startAnimation({
        node: this.refs.modalBackdrop,
        duration: 400,
        easing: 'easeInQuad',
        property: 'opacity',
        toValue: 0.8,
      });

      AnimationExperimental.startAnimation({
        node: this.refs.modalContainer,
        duration: 400,
        easing: 'easeInQuad',
        property: 'opacity',
        toValue: 1
      });

      this.setState({
        modalWillShow: false
      })
    }
  },
  render: function() {
    var modal;
    var answerMessage;

    if ( this.state.gotRight ) {
      answerMessage = (
        <View>
          <Text style={[styles._modalMessageText, styles._baseText, styles._successText]}>
            Correct!
          </Text>
          <Button
            title={'Continue →'}
            onClick={this.goNextQuestion}
            styles={styles._baseButton}
            textStyles={styles._baseButtonText}
            underlayColor={'white'}/>
        </View>
      );
    } else {
      answerMessage = (
        <View style={styles.questionModalMessge}>
          <Text style={[styles._modalMessageText, styles._baseText]}>
            Sorry, the correct answer was
            {'\n'}
          </Text>
          <View style={styles.questionVariableMessage}>
            <Text style={[styles.questionVariableMessageText, styles._baseText]}>
             {this.state.rightAnswer}
            </Text>
          </View>
          <Button
            title={'← Try Again'}
            onClick={this.goHome}
            styles={styles._baseButton}
            textStyles={styles._baseButtonText}
            underlayColor={'white'}/>
        </View>
      );
    }

    // Check whether to show the modal or not
    if ( this.state.showModal ) {
      modal = (
        <View style={[styles._modalContainer]}>
          <View ref='modalBackdrop' style={styles._modalBackdrop}>
          </View>
          <View ref='modalContainer' style={[styles._modalMessageContainer]}>
            {answerMessage}
          </View>
        </View>
      );  
    } else {
      modal = null;
    }
    
    return (
      <View style={styles.container}>
        <Text style={[styles.question, styles._baseText]}>
          If someone is feeling
          {'\n'}
        </Text>
        <View style={styles.questionVariable}>
          <Text style={[styles.questionVariableText, styles._baseText]}>
            {this.state.question}
          </Text>
        </View>
        <Text style={[styles.question, styles._spaceBottomLarge, styles._baseText]}>
          {'\n'}
          then they are most likely...
        </Text>
        <Button
            title={this.state.answerA}
            onClick={this.onAnswerA}
            styles={styles._baseButton}
            textStyles={styles._baseButtonText}
            underlayColor={'white'}/>
        <Button
            title={this.state.answerB}
            onClick={this.onAnswerB}
            styles={styles._baseButton}
            textStyles={styles._baseButtonText}
            underlayColor={'white'}/>
        <Button
            title={this.state.answerC}
            onClick={this.onAnswerC}
            styles={styles._baseButton}
            textStyles={styles._baseButtonText}
            underlayColor={'white'}/>
        {modal}
      </View>
    );
  }
})

var Home = React.createClass({
  onPlay : function () {
    this.props.navigator.push({
      state: 'Question'
    });
  },
  render: function () {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles._baseText]}>
          Emotions Quiz
        </Text>
        <Text style={[styles.subtitle, styles._baseText]}>
          How well can you identify emotions?
        </Text>
        <HighScore highScore={this.props.highScore}/>
        <Button
            title={'Play'}
            onClick={this.onPlay}
            styles={styles._baseButton}
            textStyles={styles._baseButtonText}
            underlayColor={'white'}/>
        <Button title={'About'}
            styles={styles._baseButton}
            textStyles={styles._baseButtonText}/>
      </View>
    );
  }
})

var EmotionsQuiz = React.createClass({
  gotQuestionWrong: function () {
    if ( this.state.numberOfQuestionsRight !== 0 ) {
      if ( this.state.numberOfQuestionsRight > this.state.highScore ) {
        this.setState({
          highScore : this.state.numberOfQuestionsRight
        });

        AsyncStorage.setItem('highScore', '' + this.state.numberOfQuestionsRight);
      }
    }

    this.setState({
      numberOfQuestionsRight : 0
    });
  },
  gotQuestionRight: function () {
    this.setState({
      numberOfQuestionsRight : this.state.numberOfQuestionsRight + 1
    });
  },
  getInitialState: function () {
    var that = this;
    AsyncStorage.getItem('highScore', function ( e ) {
      if ( e ) {
        that.setState({
          highScore : parseInt(e, 10)
        }); 
      }
    });

    return ({
      highScore : 0,
      numberOfQuestionsRight : 0,
    });
  },
  _router: function(route, navigator) {
    if (route.state === 'Question') {
      return(
        <QuestionSlide
            gotQuestionWrong={this.gotQuestionWrong}
            gotQuestionRight={this.gotQuestionRight}
            navigator={navigator}
            name={route.state}/>);
    }

    return (<Home navigator={navigator} name={route.state} highScore={this.state.highScore}/>);
  },
  render: function() {
    return (
      <Navigator
        initialRoute={{state: 'Home'}}
        renderScene={ this._router }/>
    );
  }
});

AppRegistry.registerComponent('EmotionsQuiz', () => EmotionsQuiz);
