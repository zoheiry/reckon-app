import React from 'react';
import PropTypes from 'prop-types';

import { Text, StyleSheet } from 'react-native';

const InfoText = ({ children, style }) => (
  <Text style={[styles.infoText, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  infoText: {
    fontFamily: 'montserrat-bold',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#ff6d4b',
  },
});

InfoText.propTypes = {
  children: PropTypes.node,
};

export default InfoText;