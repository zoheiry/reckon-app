import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const Wrapper = ({ children, style, ...props }) => (
  <View style={[styles.wrapper, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
});

Wrapper.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Wrapper;