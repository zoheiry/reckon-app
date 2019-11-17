import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import Wrapper from '../components/Wrapper';
import Title from '../components/Title';
import PlayerName from '../components/PlayerName';
import WordsForm from '../components/WordsForm';
import CtaWrapper from '../components/CtaWrapper';
import Button from '../components/Button';

import { getRandomAnimal, getRandomCelebrity, getRandomMovie } from '../utils/wordGenerator';

import { ANIMALS, MOVIES, CELEBRITIES } from '../constants/CategoryTypes';

const getInitialPlayerWords = (players) =>
  players.reduce((acc, playerName) => {
    return {
      ...acc,
      [playerName]: {
        [ANIMALS]: ['', ''],
        [MOVIES]: ['', ''],
        [CELEBRITIES]: ['', ''],
      },
    };
  }, {});

const Words = ({ players, onSubmit }) => {
  const [playerWords, setPlayerWords] = useState(getInitialPlayerWords(players));
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const scrollContainer = useRef(null);

  const getAllWordsForPlayer = (player) => {
    const wordsByCategory = playerWords[player];
    const categories = Object.keys(wordsByCategory);
    return categories.reduce((acc, category) =>
      [...acc, ...wordsByCategory[category]],
    []);
  }

  const getAllWords = () =>
    players.reduce((acc, player) => [
      ...acc,
      ...getAllWordsForPlayer(player),
    ], []);

  const handleChangePlayerWords = (categoryType, text, index) => {
    const currentPlayerWords = playerWords[currentPlayer];
    const categoryWords = currentPlayerWords[categoryType];
    const newCategoryWords = [...categoryWords];
    newCategoryWords[index] = text;

    setPlayerWords({
      ...playerWords,
      [currentPlayer]: {
        ...playerWords[currentPlayer],
        [categoryType]: newCategoryWords,
      },
    });
  };

  const isPlayerFormValid = () => {
    const currentPlayerWords = playerWords[currentPlayer];
    const categories = Object.keys(currentPlayerWords);
    const allWords = getAllWordsForPlayer(currentPlayer);
    const validWords = allWords.filter(word => !!word);
    if (validWords.length === allWords.length) {
      return true;
    }
    return false;
  };

  const handleNextPress = () => {
    if (!isPlayerFormValid()) {
      return;
    }

    const lastPlayer = players[players.length - 1];
    if (currentPlayer === lastPlayer) {
      const allWords = getAllWords();
      onSubmit(allWords);
    } else {
      const nextPlayer = players[players.indexOf(currentPlayer) + 1];
      setCurrentPlayer(nextPlayer);
      scrollContainer.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const handleGenerateWords = (words, type) => {
    setPlayerWords({
      ...playerWords,
      [currentPlayer]: {
        ...playerWords[currentPlayer],
        [type]: words,
      },
    });
  }

  const ALL_CATEGORIES = [ANIMALS, MOVIES, CELEBRITIES];

  return (
    <ScrollView
      style={styles.wrapper}
      showsVerticalScrollIndicator={false}
      ref={scrollContainer}
      stickyHeaderIndices={[1]}
    >
      <Wrapper><Title>Enter words</Title></Wrapper>
      <Wrapper style={styles.playerNameWrapper}>
        <PlayerName>{currentPlayer}</PlayerName>
      </Wrapper>
      {ALL_CATEGORIES.map((type, i) => (
        <View style={styles.wordsFormWrapper} key={`words-form-${type}-${i}`}>
          <WordsForm
            categoryType={type}
            words={playerWords[currentPlayer][type]}
            onChange={(text, index) => handleChangePlayerWords(type, text, index)}
            onGenerateWords={(words) => handleGenerateWords(words, type)}
          />
        </View>
      ))}
      <CtaWrapper style={styles.buttonWrapper}>
        <Button onPress={handleNextPress} disabled={!isPlayerFormValid()}>Next Player</Button>
      </CtaWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    width: '100%',
  },
  wordsFormWrapper: {
    marginBottom: 30,
  },
  buttonWrapper: {
     width: '100%',
     alignItems: 'center',
  },
  playerNameWrapper: {
    backgroundColor: '#fff',
    paddingBottom: 15,
  },
});

Words.propTypes = {
  players: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Words;