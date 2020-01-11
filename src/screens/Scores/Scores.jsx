import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScreenOrientation } from 'expo';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import Wrapper from '../../components/Wrapper';
import Title from '../../components/Title';
import Button from '../../components/Button';
import CtaWrapper from '../../components/CtaWrapper';
import ToggleButton from '../../components/ToggleButton';

const addStateToWords = (wordIds, state) => wordIds.map(id => ({ id, state }));

const Scores = ({ correctWordIds, skippedWordIds, wordsById, onConfirm }) => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  const [wordsWithStates, setWordsStates] = useState([
    ...addStateToWords(correctWordIds, 'correct'),
    ...addStateToWords(skippedWordIds, 'skipped'),
  ]);

  const toggleWordState = (wordIndex) => {
    const words = [...wordsWithStates];
    const wordWithState = words[wordIndex];
    words[wordIndex] = {
      id: wordWithState.id,
      state: wordWithState.state === 'correct' ? 'skipped' : 'correct',
    };

    setWordsStates(words);
  }

  const handleConfrim = () => {
    const correctWordIds = [];
    const skippedWordIds = [];
    wordsWithStates.forEach(({ state, id }) => {
      if (state === 'correct') {
        correctWordIds.push(id);
      } else {
        skippedWordIds.push(id);
      }
    });
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    onConfirm(correctWordIds, skippedWordIds);
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
          {wordsWithStates.map(({ state, id }, i) => (
            <View key={`word-${id}`} style={styles.scoreWithState}>
              <Text style={styles.word}>{wordsById[id]}</Text>
              <ToggleButton
                state={state === 'correct' ? 'on' : 'off'}
                onPress={() => toggleWordState(i)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <CtaWrapper>
        <Button appearance="primary" onPress={handleConfrim}>Accept Score</Button>
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
  correctWordIds: PropTypes.array.isRequired,
  skippedWordIds: PropTypes.array.isRequired,
  wordsById: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Scores;