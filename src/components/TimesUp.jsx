import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import ClockIcon from '../icons/Clock';

const TimesUp = () => (
  <View style={styles.wrapper}>
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      source={require('../assets/images/background-white.png')}
    >
      <Text style={styles.title}>Time’s up!</Text>
      <View style={styles.iconWrapper}>
        <ClockIcon />
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: '#ff6d4b',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    fontFamily: 'numpty-regular',
    color: '#fff',
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
  }
});

export default TimesUp;