import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView, View, StyleSheet } from 'react-native';

import Input from '../components/Input';
import Wrapper from '../components/Wrapper';
import Title from '../components/Title';
import PlayerName from '../components/PlayerName';
import Button from '../components/Button';
import Draggable from '../components/Draggable';

const getPossibleNumberOfTeams = (numberOfPlayers) =>
  Array(Math.floor(numberOfPlayers / 2) - 1).fill({}).map((_, i) => i + 2);

const Teams = ({ players = [] }) => {
  const possibleNumberOfTeams = getPossibleNumberOfTeams(players.length);
  const [numberOfTeams, setNumberOfTeams] = useState(0);

  useEffect(() => {
    if (possibleNumberOfTeams.length === 1) {
      setNumberOfTeams(2);
    }
  }, []);

  const handleSubmitNumberOfTeams = ({ nativeEvent }) => {
    setNumberOfTeams(nativeEvent.text);
  }

  return (
    <Wrapper>
      <Title>Teams</Title>
      {numberOfTeams ? <Text style={styles.infoText}>Drag and drop to pick teams</Text> : null}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.playersList}>
        {players.map((playerName, i) => (
          <View style={styles.playerNameWrapper} key={`player-name-${i}`}>
            <PlayerName>{playerName}</PlayerName>
          </View>
        ))}
      </ScrollView>
      {!numberOfTeams ? (
        <View style={styles.numberOfTeams}>
          <Text style={[styles.infoText, styles.label]}>Select number of teams</Text>
          <View style={styles.buttonsWrapper}>
            {possibleNumberOfTeams.map(number => (
              <Button
                key={`select-teams-${number}`}
                size="sm"
                onPress={() => setNumberOfTeams(number)}
                appearance="secondary"
                wrapperStyle={styles.teamsCountButton}
              >
                {number}
              </Button>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.teamsWrapper}>
          {Array(numberOfTeams).fill({}).map((_, i) => (
            <View key={`team-wrapper-${i}`}>
              <Text style={styles.teamTitle}>Team {i + 1}</Text>
              <Text style={styles.dropBox}>DROP HERE</Text>
            </View>
          ))}
        </View>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  infoText: {
    fontFamily: 'montserrat-bold',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    color: '#ff6d4b',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  playersList: {
    flexGrow: 0,
  },
  playerNameWrapper: {
    marginRight: 10,
    marginTop: 20,
  },
  numberOfTeams: {
    width: '100%',
    marginTop: 50,
  },
  label: {
    marginBottom: 5,
    marginLeft: 10,
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  teamsCountButton: {
    marginRight: 10,
  },
  teamsWrapper: {
    paddingVertical: 50,
    flex: 1,
    justifyContent: 'space-between',
  },
  teamTitle: {
    fontSize: 36,
    fontFamily: 'numpty-regular',
    color: '#000',
    textAlign: 'center',
  },
  dropBox: {
    fontFamily: 'montserrat-bold',
    fontSize: 20,
    marginTop: 20,
    borderWidth: 4,
    borderColor: '#000',
    borderStyle: 'dotted',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

Teams.propTypes = {
  players: PropTypes.array.isRequired,
};

export default Teams;