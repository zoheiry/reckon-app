import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import Stain1 from './stains/Stain1';

const getColorForAppearance = (appearance) => {
  switch (appearance) {
    case 'primary':
      return '#DAFF00';
    case 'secondary':
      return '#CFB4FF';
    case 'warning':
      return '#FD843E';
    default:
      return '#DAFF00';
  }
};

const getStylesForSize = (size) => {
  switch (size) {
    case 'sm':
      return {
        dimensions: { width: 70, height: 70 },
        text: { fontSize: 16 },
        border: { borderWidth: 3, borderRadius: 70 / 2, },
      }
    case 'md':
      return {
        dimensions: { width: 100, height: 100 },
        text: { fontSize: 18 },
        border: { borderWidth: 5, borderRadius: 100 / 2, },
      }
    case 'lg':
      return {
        dimensions: { width: 150, height: 150 },
        text: { fontSize: 24 },
        border: { borderWidth: 7, borderRadius: 150 / 2, },
      }
    default:
      return {
        dimensions: { width: 150, height: 150 },
        text: { fontSize: 24 },
        border: { borderWidth: 7, borderRadius: 150 / 2, },
      }
  }
};

const Button = ({
  children,
  appearance = 'primary',
  disabled,
  onPress,
  style,
  wrapperStyle,
  size = 'lg',
}) => {
  const sizeStyles = getStylesForSize(size);
  const appearanceColor = getColorForAppearance(appearance);

  return (
    <View style={[styles.wrapper, sizeStyles.dimensions, wrapperStyle]}>
      <Stain1 color={disabled ? '#E7E7E7' : appearanceColor} style={sizeStyles.dimensions} />
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          sizeStyles.dimensions,
          sizeStyles.border,
          disabled ? styles.disabled : null,
          style
        ]}
      >
        <Text style={[styles.text, sizeStyles.text, disabled ? styles.disabled : null]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeSm: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 3,
  },
  text: {
    fontSize: 24,
    fontFamily: 'montserrat-bold'
  },
  disabled: {
    borderColor: '#7E7E7E',
    color: '#7E7E7E',
  },
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  appearance: PropTypes.oneOf([
    'primary',
    'secondary',
    'warning',
  ]),
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Button;