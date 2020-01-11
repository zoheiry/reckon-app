import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const ToggleButton = ({ state = 'on', onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={[styles.slider, state === 'on' ? styles.sliderOn : styles.sliderOff]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 70,
    borderWidth: 3,
    borderRadius: 22,
    height: 35,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderWidth: 3,
    borderRadius: 35 / 2,
    top: -3,
  },
  sliderOn: {
    backgroundColor: '#1AFB9B',
    right: -3,
  },
  sliderOff: {
    backgroundColor: '#FD843E',
    left: -3,
  }
});

ToggleButton.propTypes = {
  state: PropTypes.oneOf(['on', 'off']),
  onPress: PropTypes.func,
};

export default ToggleButton;