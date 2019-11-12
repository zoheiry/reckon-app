import React from 'react';
import PropTypes from 'prop-types';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BackIcon from '../icons/Back';
import SettingsIcon from '../icons/Settings';

const Header = ({ onBackPress, onSettingsPress, withBackButton, withSettingsButton }) => (
  <View style={[styles.wrapper, withBackButton ? styles.withBackButton : '']}>
    {withBackButton && (
      <TouchableOpacity onPress={onBackPress}>
        <BackIcon />
      </TouchableOpacity>
    )}
    {withSettingsButton && (
      <TouchableOpacity onPress={onSettingsPress}>
        <SettingsIcon />
       </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginTop: '5%',
    marginBottom: 25,
    height: 40,
  },
  withBackButton: {
    justifyContent: 'space-between',
  }
});

Header.propTypes = {
  onBackPress: PropTypes.func,
  onSettingsPress: PropTypes.func,
  withBackButton: PropTypes.bool,
  withSettingsButton: PropTypes.bool,
}

Header.defaultProps = {
  onBackPress: () => null,
  onSettingsPress: () => null,
};

export default Header;