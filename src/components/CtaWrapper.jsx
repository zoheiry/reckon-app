import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Keyboard } from 'react-native';

const CtaWrapper = ({ children, style, }) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleKeyboardShow = () => {
    setIsKeyboardOpen(true);
  };

  const handleKeyboardHide = () => {
    setIsKeyboardOpen(false);
  };

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', handleKeyboardShow);
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', handleKeyboardHide);
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={[
        styles.wrapper,
        isKeyboardOpen ? styles.keyboardOpen : '',
        style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 50,
  },
  keyboardOpen: {
    marginTop: 20,
    marginBottom: 10,
  }
});

CtaWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CtaWrapper;