import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet, View, Image } from 'react-native';

const getStainSourceForAppearance = (appearance) => {
  switch (appearance) {
    case 'primary':
      return require('../../assets/images/inputStain1.png');
    case 'secondary':
      return require('../../assets/images/inputStain2.png')
    case 'success':
      return require('../../assets/images/inputStain3.png')
  }
}

const Input = ({
  onChangeText = () => null,
  appearance = 'primary',
  value,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = text => {
    onChangeText(text);
  }

  const stainSource = getStainSourceForAppearance(appearance);

  return (
    <View style={[styles.wrapper, style]}>
      <Image source={stainSource} style={styles.stain}/>
      <TextInput
        placeholderTextColor="#8d8d8d"
        onChangeText={handleInputChange}
        value={value}
        style={[styles.input, (isFocused || value) ? styles.focusedState : '']}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center'
  },
  stain: {
    position: 'absolute',
    width: '97%',
    height: '100%',
    bottom: -7
  },
  input: {
    borderWidth: 4,
    borderColor: '#8d8d8d',
    borderRadius: 22,
    width: '100%',
    fontSize: 18,
    paddingHorizontal: 20,
    height: 44,
  },
  focusedState: {
    borderColor: '#000',
  },
});

Input.propTypes = {
  onChangeText: PropTypes.func,
  appearance: PropTypes.string,
};

export default Input;