var styles = require('../stylesheets/MainStylesheet');
var React  = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;
var HighScore = require('./HighScore');
var Button = require('./Button');

var Home = React.createClass({
  onPlay : function () {
    this.props.navigator.push({
      state: 'Question'
    });
  },
  render: function () {
    return (
      <View style={[styles.container, {alignItems: 'stretch'}]}>
        {/* Create 3 columns */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex : 2}}/>
          <View style={{flex : 6, alignItems: 'center', justifyContent : 'center'}}>
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
                styles={[styles._baseButton ]}
                textStyles={styles._baseButtonText}
                underlayColor={'white'}/>
            <Text style={[styles.subtitle, styles._baseText]}>
              Made by Paugme.com
            </Text>
          </View>
          <View style={{flex:2}}/>
        </View>
      </View>
    );
  }
});

module.exports = Home;