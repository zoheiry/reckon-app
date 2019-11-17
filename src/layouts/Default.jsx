import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, ImageBackground, View, KeyboardAvoidingView } from 'react-native';
import Header from '../components/Header';

const isLandscape = (orientation) =>
  orientation && orientation.toLowerCase().includes('landscape');

const getStylesForOrientation = (orientation) => {
  const portraitStyles = {
    padding: 20,
  };
  const landscapeStyles = {
    paddingVertical: 20,
    paddingHorizontal: 40,
  };

  if (isLandscape(orientation)) {
    return landscapeStyles;
  }

  return portraitStyles;
};

const getBackgroundImageForOrientation = (orientation) => {
  if (isLandscape(orientation)) {
    return require('../assets/images/background-landscape.png');
  }
  return require('../assets/images/background-opaque.png');
}

const Default = ({
  children,
  onBackPress,
  onSettingsPress,
  withBackButton,
  withSettingsButton,
  orientation,
}) => (
  <ImageBackground
    style={styles.backgroundImage}
    resizeMode="cover"
    source={getBackgroundImageForOrientation(orientation)}
  >
      <KeyboardAvoidingView behavior="padding" enabled style={styles.wrapper}>
      <View style={[styles.content, getStylesForOrientation(orientation)]}>
        <Header
          onBackPress={onBackPress}
          onSettingsPress={onSettingsPress}
          withSettingsButton={withSettingsButton}
          withBackButton={withBackButton}
        />
          {children}
     </View>
    </KeyboardAvoidingView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  content: {
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
  orientation: PropTypes.string,
};

Default.defaultProps = {
  onBackPress: () => null,
  onSettingsPress: () => null,
  withBackButton: true,
  withSettingsButton: true,
}

export default Default;