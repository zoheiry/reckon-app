import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ScreenOrientation } from 'expo';
import { shuffle } from 'lodash';

import {
  TURN_INFO,
  ROUND_DESCRIPTION,
  COUNT_DOWN,
  IN_GAME,
  TIMES_UP,
} from '../../constants/gameStates';

import Button from '../../components/Button';
import CtaWrapper from '../../components/CtaWrapper';
import InfoText from '../../components/InfoText';
import PlayerName from '../../components/PlayerName';
import Title from '../../components/Title';

import RoundDescription from './RoundDescription';
import CountDown from './CountDown';
import Turn from './Turn';
import TurnInfo from './TurnInfo';
import TimesUp from './TimesUp';

const Play = ({ teams, words }) => {
  const [gameState, setGameState] = useState(TURN_INFO);
  const [roundNumber, setRoundNumber] = useState(1);
  const [playingTeamIndex, setPlayingTeamIndex] = useState(0);
  const playingTeam = teams[playingTeamIndex];
  const [currentPlayer, setCurrentPlayer] = useState(playingTeam[0]);
  const [correctWords, setCorrectWords] = useState([]);
  const [skippedWords, setSkippedWords] = useState([]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  const handlePlayerReady = () => {
    setGameState(ROUND_DESCRIPTION);
    setTimeout(() => setGameState(COUNT_DOWN), 6000);
  }

  const handleStartGame = () => {
    setGameState(IN_GAME);
  }

  const handleTimesUp = () => {
    setGameState(TIMES_UP)
    setTimeout(() => setGameState(null), 5000);
  }

  const handleCorrectWord = (word) => {
    const correctWordsForTeam = correctWords[playingTeamIndex] || [];
    setCorrectWords({
      ...correctWords,
      [playingTeamIndex]: [...correctWordsForTeam, word],
    });
  }

  const handleSkipWord = (word) => {
    const skippedWordsForTeam = skippedWords[playingTeamIndex] || [];
    setSkippedWords({
      ...skippedWords,
      [playingTeamIndex]: [...skippedWordsForTeam, word],
    });
  }

  if (gameState === TURN_INFO) {
     return (
       <TurnInfo
         currentPlayer={currentPlayer}
         teamNumber={playingTeamIndex + 1}
         onReady={handlePlayerReady}
       />
     );
  };

  if (gameState === ROUND_DESCRIPTION) {
    return (
      <RoundDescription roundNumber={roundNumber} />
    );
  }

  if (gameState === COUNT_DOWN) {
    return (
      <CountDown onFinish={handleStartGame} />
    );
  }

  if (gameState === TIMES_UP) {
    return <TimesUp />;
  }

  if (gameState === IN_GAME) {
    return (
      <Turn
        onFinish={handleTimesUp}
        words={words}
        onSkipWord={handleSkipWord}
        onCorrectWord={handleCorrectWord}
      />
    );
  }
  
  return null;

};

Play.propTypes = {
  teams: PropTypes.array.isRequired,
  words: PropTypes.array.isRequired,
};

export default Play;