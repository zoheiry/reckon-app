import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Timer from './Timer';
import Card from './Card';
import Wrapper from './Wrapper';
import Button from './Button';
import TimesUp from './TimesUp';

const Turn = ({ words, onEnd, onCorrectWord, onSkipWord }) => {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [cardAnimationType, setCardAnimationType] = useState(null);

  const toggleCardAnimationType = (type) => {
    setCardAnimationType(type);
    setTimeout(() => setCardAnimationType(null), 1000);
  }

  const goToNextCard = () => {
    const nextWordIndex = currentWordIndex + 1;
    if (nextWordIndex < words.length) {
      setCurrentWordIndex(nextWordIndex);
    } else {
      onEnd();
    }
  }

  const goToPrevCard = () => {
    const prevCardIndex = currentWordIndex - 1;
    if (prevCardIndex > -1) {
      setCurrentWordIndex(prevCardIndex);
    }
  }

  const handleSkipCard = () => {
    const word = words[currentWordIndex];
    onSkipWord(word);

    toggleCardAnimationType('error');

    setTimeout(goToNextCard, 400);
  };

  const handleCorrectCard = () => {
    const word = words[currentWordIndex];
    onCorrectWord(word);

    toggleCardAnimationType('success');

    setTimeout(goToNextCard, 400);
  };

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
            <Card animationType={cardAnimationType}>{words[currentWordIndex]}</Card>
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

Turn.propTypes = {
  words: PropTypes.array.isRequired,
  onEnd: PropTypes.func.isRequired,
  onSkipWord: PropTypes.func.isRequired,
  onCorrectWord: PropTypes.func.isRequired,
};

export default Turn;