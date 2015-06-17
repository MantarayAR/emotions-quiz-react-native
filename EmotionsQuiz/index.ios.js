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

var Home = require('./components/Home');
var QuestionSlide = require('./components/QuestionSlide');

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
