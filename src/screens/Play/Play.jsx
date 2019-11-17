import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ScreenOrientation } from 'expo';
import { shuffle } from 'lodash';

import Button from '../../components/Button';
import CtaWrapper from '../../components/CtaWrapper';
import InfoText from '../../components/InfoText';
import PlayerName from '../../components/PlayerName';
import Title from '../../components/Title';
import RoundDescription from './RoundDescription';
import CountDown from './CountDown';
import Cards from './Cards';

const DEFAULT_STATES = {
  READY: true,
  STARTED: true,
  DESCRIPTION: false,
};

const Play = ({ teams, words }) => {
  const [isReady, setIsReady] = useState(DEFAULT_STATES.READY);
  const [gameStarted, setGameStarted] = useState(DEFAULT_STATES.STARTED);
  const [showRoundDescription, setShowRoundDescription] = useState(DEFAULT_STATES.DESCRIPTION);
  const [roundNumber, setRoundNumber] = useState(1);
  const [playingTeamIndex, setPlayingTeamIndex] = useState(0);
  const playingTeam = teams[playingTeamIndex];
  const [currentPlayer, setCurrentPlayer] = useState(playingTeam[0]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  const handlePlayerReady = () => {
    setIsReady(true);
    setTimeout(() => setShowRoundDescription(false), 6000);
  }

  const handleStartGame = () => {
    setGameStarted(true);
  }

  if (!isReady) {
     return (
       <View style={styles.startGameWrapper}>
         <View />
         <View>
           <Title size="md">All players ready</Title>
           <View style={styles.playerNameWrapper}>
             <InfoText>Team {playingTeamIndex + 1} Playing</InfoText>
             <PlayerName>{currentPlayer}</PlayerName>
           </View>
         </View>
         <CtaWrapper>
           <Button onPress={handlePlayerReady}>Ready</Button>
         </CtaWrapper>
       </View>
     );
  };

  if (showRoundDescription) {
    return (
      <RoundDescription roundNumber={roundNumber} />
    );
  }

  if (!gameStarted) {
    return (
      <CountDown onFinish={handleStartGame} />
    );
  }

  return <Cards onFinish={() => null} words={shuffle(words)} />;

};

const styles = StyleSheet.create({
  startGameWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playersReadyTitle: {
    fontSize: 42,
    marginBottom: 10,
    fontFamily: 'numpty-regular',
    color: '#000',
    textAlign: 'center',
  },
  playerNameWrapper: {
    alignItems: 'center',
  }
});

Play.propTypes = {
  teams: PropTypes.array.isRequired,
  words: PropTypes.array.isRequired,
};

export default Play;