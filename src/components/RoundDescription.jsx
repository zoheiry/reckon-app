import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Wrapper from './Wrapper';
import Title from './Title';
import InfoText from './InfoText';

const getRoundText = (roundNumber) => {
  switch (roundNumber) {
    case 1:
      return 'Try to explain the card to your team by saying anything other than words from the card.';
    case 2:
      return 'Try to explain the card to your team using only one word';
    case 3:
      return 'Try to explain the card to your team by acting only';
    default:
      return '';
  }
}

const RoundDescription = ({ roundNumber }) => {
  const roundDescription = getRoundText(roundNumber);

  return (
    <Wrapper style={styles.wrapper}>
      <Title style={styles.title}>{`Round ${roundNumber}`}</Title>
      <Text style={styles.description}>{roundDescription}</Text>
      <InfoText>You can swipe left to go back to the previous card</InfoText>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    fontSize: 36,
  },
  description: {
    width: '80%',
    fontFamily: 'montserrat-bold',
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 20,
  }
});

RoundDescription.propTypes = {
  roundNumber: PropTypes.oneOf([1, 2, 3]),
};

export default RoundDescription;