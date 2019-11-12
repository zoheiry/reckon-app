import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

const PlayerName = ({ children }) => (
  <View style={styles.wrapper}>
    <Text style={styles.text}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 27,
    borderWidth: 4,
    borderColor: '#000',
    backgroundColor: '#daff00',
  },
  text: {
    fontFamily: 'montserrat-regular',
    fontSize: 18,
    color: '#000',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 27,
  },
  stain: {
    position: 'absolute',
    width: '90%',
  },
});

PlayerName.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlayerName;