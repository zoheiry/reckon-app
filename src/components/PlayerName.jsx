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
    fontFamily: 'montserrat-bold',
    fontSize: 18,
    color: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 25,
  },
});

PlayerName.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlayerName;