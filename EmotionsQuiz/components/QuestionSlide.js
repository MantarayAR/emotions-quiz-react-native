var styles = require('../stylesheets/MainStylesheet');
var React  = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;
var AnimationExperimental = require('AnimationExperimental');
var Emotions = require('../utilities/Emotions');
var shuffle = require('../utilities/Shuffle');
var Button = require('./Button');

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
});

module.exports = QuestionSlide;