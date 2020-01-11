import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const getStylesForSize = (size) => {
  switch (size) {
    case 'sm':
      return {
        fontSize: 24,
      };
    case 'md':
      return {
        fontSize: 36,
      };
    case 'lg':
      return {
        fontSize: 60,
      };
  }
}

const Title = ({ children, style, size = 'lg' }) =>
  <Text style={[styles.text, getStylesForSize(size), style]}>
    {children}
  </Text>;

const styles = {
  text: {
    fontFamily: 'numpty-regular',
    color: '#823ffe',
    marginBottom: 10,
  }
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

};

export default Title;