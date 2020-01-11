import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import Title from './Title';
import InfoText from './InfoText';
import PlayerName from './PlayerName';
import Button from './Button';

const TurnInfo = ({ currentPlayer, onReady }) => {
  return (
     <View style={styles.wrapper}>
       <View style={styles.playerNameWrapper}>
         <PlayerName>{currentPlayer}</PlayerName>
       </View>
       <Button onPress={onReady}>Start!</Button>
     </View>
   );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  playerNameWrapper: {
    alignItems: 'center',
  },
  infoText: {
    marginBottom: 0,
    marginLeft: 10,
  }
});

TurnInfo.propTypes = {
  onReady: PropTypes.func.isRequired,
  currentPlayer: PropTypes.string.isRequired,
};

export default TurnInfo;