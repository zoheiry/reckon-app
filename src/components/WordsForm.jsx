import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Input from './Input';
import GenerateIcon from '../icons/Generate';

import categoryTypes from '../constants/categoryTypes';

import { getRandomWordForCategory } from '../utils/wordGenerator';

const getCategoryNameForType = (type) => {
  switch (type) {
    case categoryTypes.ANIMALS:
      return 'Animals';
    case categoryTypes.CELEBRITIES:
      return 'Celebrities';
    case categoryTypes.MOVIES:
      return 'Movies / Tv.series';
  }
};

const getAppearanceForType = (type) => {
  switch (type) {
    case categoryTypes.ANIMALS:
      return 'success';
    case categoryTypes.CELEBRITIES:
      return 'primary';
    case categoryTypes.MOVIES:
      return 'secondary';
  }
};

const WordsForm = ({ categoryType,
  onChange = () => null,
  words = [],
  onGenerateWords = () => null
}) => {
  const handleChangeText = (text, index) => {
    onChange(text, index);
  }

  const handleGenerateWordPress = () => {
    const word1 = getRandomWordForCategory(categoryType);
    const word2 = getRandomWordForCategory(categoryType);
    onGenerateWords([word1, word2]);
  }

  const categoryName = getCategoryNameForType(categoryType);
  const appearance = getAppearanceForType(categoryType);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.categoryTitle}>{categoryName}</Text>
      <View>
        {words.map((word, i) => (
          <View style={styles.inputWrapper} key={`${categoryType}-word-input-${i}`}>
            <Input
              placeholder={categoryName}
              appearance={appearance}
              onChangeText={text => handleChangeText(text, i)}
              value={word}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.generateWordsButton} onPress={handleGenerateWordPress}>
        <GenerateIcon />
        <Text style={styles.generateWordsText}>Generate words</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 5,
    borderRadius: 18,
    borderColor: '#000',
    paddingVertical: 32,
    paddingHorizontal: 22,
  },
  categoryTitle: {
    fontFamily: 'numpty-regular',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginBottom: 35,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    flex: 1,
    width: '100%',
  },
  wordNumber: {
    fontFamily: 'montserrat-regular',
    fontSize: 18,
    color: '#000',
    marginRight: 12,
  },
  generateWordsButton: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateWordsText: {
    fontFamily: 'montserrat-medium',
    fontSize: 18,
    marginLeft: 5,
  }
});

WordsForm.propTypes = {
  categoryType: PropTypes.oneOf(Object.values(categoryTypes)),
  onChange: PropTypes.func,
  words: PropTypes.array,
};

export default WordsForm;