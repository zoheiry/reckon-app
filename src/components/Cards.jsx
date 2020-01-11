import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Timer from './Timer';
import Card from './Card';
import Wrapper from './Wrapper';
import Button from './Button';
import TimesUp from './TimesUp';

const CARD_ANIMATION_DURATION = 1000;
const ACTION_TYPES = {
  CORRECT: 'correct',
  SKIP: 'skip',
};

const Cards = ({ word, onEnd, onCorrectWord, onSkipWord }) => {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [cardAnimationType, setCardAnimationType] = useState(null);

  const { CORRECT, SKIP } = ACTION_TYPES;

  const toggleCardAnimationType = (type) => {
    setCardAnimationType(type);
    setTimeout(() => setCardAnimationType(null), CARD_ANIMATION_DURATION);
  }

  const handleSkipCard = () => handleNextCard(SKIP);

  const handleCorrectCard = () => handleNextCard(CORRECT);

  const handleNextCard = (actionType) => {
    // animation still in progress?
    if (cardAnimationType) return;

    toggleCardAnimationType(actionType);

    setTimeout(() => {
      if (actionType === CORRECT) {
        onCorrectWord();
      } else if (actionType === SKIP) {
        onSkipWord();
      }
    }, CARD_ANIMATION_DURATION - 400);
  }

  const handleTimesUp = () => {
    setIsTimeUp(true);
    setTimeout(onEnd, 5000);
  }

  return (
    isTimeUp ? (
      <TimesUp />
    ) : (
      <Wrapper>
        <Timer onFinish={handleTimesUp} />
        <View style={styles.content}>
          <Button appearance="warning" onPress={handleSkipCard}>Skip</Button>
          <View style={styles.cardWrapper}>
            <Card animationType={cardAnimationType}>{word}</Card>
          </View>
          <Button appearance="primary" onPress={handleCorrectCard}>YAY! {'\n'} Next</Button>
        </View>
      </Wrapper>
    )
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    marginTop: 25,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cardWrapper: {
    paddingHorizontal: 20,
    width: 450,
  }
});

Cards.propTypes = {
  word: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired,
  onSkipWord: PropTypes.func.isRequired,
  onCorrectWord: PropTypes.func.isRequired,
};

export default Cards;