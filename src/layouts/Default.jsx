import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, ImageBackground, View } from 'react-native';
import Header from '../components/Header';

const Default = ({
  children,
  onBackPress,
  onSettingsPress,
  withBackButton,
  withSettingsButton
}) => (
  <ImageBackground
    style={styles.backgroundImage}
    resizeMode="cover"
    source={require('../assets/images/background-opaque.png')}
  >
    <View style={styles.content}>
      <Header
        onBackPress={onBackPress}
        onSettingsPress={onSettingsPress}
        withSettingsButton={withSettingsButton}
        withBackButton={withBackButton}
      />
      {children}
   </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'montserrat-regular',
  }
});

Default.propTypes = {
  children: PropTypes.node,
  onBackPress: PropTypes.func,
  onSettingsPress: PropTypes.func,
  withBackButton: PropTypes.bool,
  withSettingsButton: PropTypes.bool,
};

Default.defaultProps = {
  onBackPress: () => null,
  onSettingsPress: () => null,
  withBackButton: true,
  withSettingsButton: true,
}

export default Default;