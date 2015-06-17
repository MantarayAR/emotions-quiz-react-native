var styles = require('../stylesheets/MainStylesheet');
var React  = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

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

module.exports = HighScore;