import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScreenOrientation } from 'expo';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import Wrapper from '../../components/Wrapper';
import Title from '../../components/Title';
import Button from '../../components/Button';
import CtaWrapper from '../../components/CtaWrapper';
import ToggleButton from '../../components/ToggleButton';

const addStateToWords = (words, state) => words.map(word => ({ word, state }));

const Scores = ({ correctWords, skippedWords, onConfirm }) => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  const [wordsWithStates, setWordsStates] = useState([
    ...addStateToWords(correctWords, 'correct'),
    ...addStateToWords(skippedWords, 'skipped'),
  ]);

  const toggleWordState = (wordIndex) => {
    const words = [...wordsWithStates];
    const wordWithState = words[wordIndex];
    words[wordIndex] = {
      word: wordWithState.word,
      state: wordWithState.state === 'correct' ? 'skipped' : 'correct',
    };

    setWordsStates(words);
  }

  const handleConfrim = () => {
    const correctWords = [];
    const skippedWords = [];
    wordsWithStates.forEach(({ word, state}) => {
      if (state === 'correct') {
        correctWords.push(word);
      } else {
        skippedWords.push(word);
      }
    });
    onConfirm(correctWords, skippedWords);
  }

  const correctWordsLength = wordsWithStates.filter(({ state }) => state === 'correct').length;

  return (
    <Wrapper>
      <Title>Scores</Title>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewWrapper}>
        <View style={styles.contentWrapper}>
          <Title size="md" style={styles.currentScore}>
            {correctWordsLength}/{wordsWithStates.length}
          </Title>
          {wordsWithStates.map(({ word, state }, i) => (
            <View key={`${word}-${i}`} style={styles.scoreWithState}>
              <Text style={styles.word}>{word}</Text>
              <ToggleButton
                state={state === 'correct' ? 'on' : 'off'}
                onPress={() => toggleWordState(i)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <CtaWrapper>
        <Button appearance="primary" onPress={onConfirm}>Accept Score</Button>
      </CtaWrapper>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    borderWidth: 5,
    borderRadius: 18,
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  contentWrapper: {
    padding: 20,
  },
  currentScore: {
    textAlign: 'center',
  },
  scoreWithState: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  word: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
    color: '#000',
  },
});

Scores.propTypes = {
  correctWords: PropTypes.array,
  skippedWords: PropTypes.array,
  onConfirm: PropTypes.func.isRequired,
};

export default Scores;