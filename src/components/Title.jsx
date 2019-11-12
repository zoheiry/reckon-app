import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const Title = ({ children }) => <Text style={styles.text}>{children}</Text>;

const styles = {
  text: {
    fontFamily: 'numpty-regular',
    fontSize: 60,
    color: '#823ffe',
  }
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;