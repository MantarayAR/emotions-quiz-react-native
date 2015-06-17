/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
var React = require('React');
var Text = require('Text');
var View = require('View');
var TouchableHighlight = require('TouchableHighlight');

class Button extends React.Component {
  click() {
    this.props.pressed = ! this.props.pressed;

    this.props.onClick( ! this.props.pressed );
  }
  render() {
    return (
      <TouchableHighlight
          onPress={() => this.click() }
          style={this.props.styles}
          underlayColor={this.props.underlayColor}>
        <Text style={this.props.textStyles}>{this.props.title}</Text>
      </TouchableHighlight>
    );
  }
}

exports.Button = Button;