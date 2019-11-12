import React, { Component } from "react";
import {
  View,
  PanResponder,
  Animated
} from "react-native";

class Draggable extends Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5
        }).start();
      }
    });
      // adjusting delta value
    this.state.pan.setValue({ x:0, y:0})
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
        <Animated.View {...this.panResponder.panHandlers} style={panStyle}>
          {this.props.children}
        </Animated.View>
    );
  }
}

export default Draggable;