/**
 * Emotions Quiz React Native App
 * BSD License
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  PixelRatio
} = React;

var themeColor = '#1E88E5';
var successColor = '#B2DFDB';

var styles = {
  _successText : {
    color: successColor
  },
  _baseText : {
    color: '#eee',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  _baseThinText : {
    color: '#eee',
    fontFamily: 'Helvetica'
  },
  _baseButton : {
    backgroundColor: '#eee',
    borderRadius: 5,
    margin: 10,
    padding: 10,
    width: PixelRatio.getPixelSizeForLayoutSize(90),
  },
  _baseButtonText : {
    color: themeColor,
    textAlign: 'center',
  },
  _spaceBottomLarge : {
    marginBottom: 30
  },
  _modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  _modalBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    opacity: 0.0,
  },
  _modalMessageContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity : 0.0,
  },
  _modalMessageText : {
    fontSize: 32,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 30,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(80)
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  topScore : {
    marginBottom: 5
  },
  topScoreValue : {
    borderBottomWidth: 5,
    borderBottomColor: 'black'
  },
  questionModalMessge : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question : {
    fontSize: 25,
    textAlign: 'center',
  },
  questionVariable : {
    borderBottomColor: 'white',
    borderBottomWidth: 5,
  },
  questionVariableText: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  questionVariableMessage : {
    borderBottomColor: 'white',
    borderBottomWidth: 5,
    marginBottom: 30,
    textAlign: 'center'
  },
  questionVariableMessageText : {
    fontSize: 35,
    marginBottom: 10,
    textAlign: 'center',
  }
};

module.exports = StyleSheet.create(styles);