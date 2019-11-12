import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Wrapper from '../components/Wrapper';
import Button from '../components/Button';

const Start = ({ onStart }) => (
  <Wrapper style={styles.wrapper}>
    <View style={styles.content}>
      <Text style={styles.title}>Reckon!</Text>
      <Button onPress={onStart}>Start</Button>
     </View>
  </Wrapper>
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-end',
  },
  content: {
    flex: 0.7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 72,
    color: '#232323',
    fontFamily: 'numpty-regular',
  }
});

export default Start;
