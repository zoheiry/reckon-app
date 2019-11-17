import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';

const Card = ({ children, animationType }) => {
  const [borderAnimation] = useState(new Animated.Value(0));

  const errorBorderColorConfig = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#ff6d4b'],
  });

  const successBackgroundColorConfig = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#1afb9b'],
  });

  const flashBorder = (duration = 300) => {
    Animated.sequence([
      Animated.timing(borderAnimation, {
        toValue: 1,
        duration,
      }),
      Animated.timing(borderAnimation, {
        toValue: 0,
        duration,
      }),
    ]).start();
  };

  useEffect(() => {
    if (animationType) {
      flashBorder();
    }
  }, [animationType]);

  const backgroundColorStyle = animationType && {
    backgroundColor: animationType === 'success'
      ? successBackgroundColorConfig
      : errorBorderColorConfig
  };

  return (
    <Animated.View style={[styles.wrapper, backgroundColorStyle]}>
      <Text style={styles.text}>{children}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    paddingHorizontal: 10,
    elevation: 5,
    borderColor: 'transparent',
    borderWidth: 5,
  },
  text: {
    fontFamily: 'numpty-regular',
    fontSize: 60,
    textAlign: 'center',
    width: '100%',
  },
});

Card.propTypes = {
  children: PropTypes.string.isRequired,
  animationType: PropTypes.oneOf(['success', 'error']),
  showAnimation: PropTypes.bool,
};

export default Card;