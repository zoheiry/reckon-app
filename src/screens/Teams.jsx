import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView, View, StyleSheet } from 'react-native';

import Wrapper from '../components/Wrapper';
import Title from '../components/Title';
import PlayerName from '../components/PlayerName';
import CtaWrapper from '../components/CtaWrapper';
import Button from '../components/Button';
import InfoText from '../components/InfoText';
import HorizontalScrollView from '../components/HorizontalScrollView';

const getPossibleNumberOfTeams = (numberOfPlayers) =>
  Array(Math.floor(numberOfPlayers / 2) - 1).fill({}).map((_, i) => i + 2);

const renderPlayersList = (players = []) =>
  <HorizontalScrollView>
    {players.map((playerName, i) => (
      <View style={styles.playerNameWrapper} key={`player-name-${i}`}>
        <PlayerName>{playerName}</PlayerName>
      </View>
    ))}
  </HorizontalScrollView>;

const Teams = ({ players = [], onSubmit }) => {
  const possibleNumberOfTeams = getPossibleNumberOfTeams(players.length);
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [teamPlayers, setTeamPlayers] = useState([]);

  const handleShuffleTeams = () => {
    const playersClone = [...players];
    let teamNumber = 0;
    const randomTeamPlayers = Array(numberOfTeams).fill([]);

    while (playersClone.length) {
      const randomNumber = Math.floor(Math.random() * playersClone.length);
      const randomPlayer = playersClone[randomNumber];
      playersClone.splice(randomNumber, 1);
      randomTeamPlayers[teamNumber] = [
        ...randomTeamPlayers[teamNumber],
        randomPlayer,
      ];
      teamNumber++;
      if (teamNumber === numberOfTeams) {
        teamNumber = 0;
      }
    }

    setTeamPlayers(randomTeamPlayers);
  }

  const handleSubmit = () => {
    onSubmit(teamPlayers);
  }

  useEffect(() => {
    if (possibleNumberOfTeams.length === 1) {
      setNumberOfTeams(2);
    }
  }, []);

  return (
    <Wrapper>
      <Title>Teams</Title>
      {!teamPlayers.length && renderPlayersList(players)}
      {!numberOfTeams ? (
        <View style={styles.numberOfTeams}>
          <InfoText>Select number of teams</InfoText>
          <View style={styles.buttonsWrapper}>
            {possibleNumberOfTeams.map(number => (
              <Button
                key={`select-teams-${number}`}
                size="md"
                onPress={() => setNumberOfTeams(number)}
                appearance="success"
                wrapperStyle={styles.teamsCountButton}
              >
                {number}
              </Button>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.teamsWrapper}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper} contentContainerStyle={styles.wrapperContent}>
            {Array(numberOfTeams).fill({}).map((_, i) => (
              <View key={`team-wrapper-${i}`} style={styles.teamArea}>
                <Text style={styles.teamTitle}>Team {i + 1}</Text>
                {renderPlayersList(teamPlayers[i])}
              </View>
            ))}
          </ScrollView>
          <CtaWrapper style={styles.ctaButtons}>
            <Button appearance="secondary" onPress={handleShuffleTeams}>Shuffle Teams</Button>
            <Button onPress={handleSubmit} disabled={!teamPlayers.length}>Next</Button>
          </CtaWrapper>
        </View>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexGrow: 1,
    textAlign: 'center',
    width: '100%',
  },
  wrapperContent: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexGrow: 1,
  },
  playersList: {
    flexGrow: 0,
  },
  playerNameWrapper: {
    marginRight: 10,
  },
  numberOfTeams: {
    width: '100%',
    marginTop: 50,
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ctaButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamsCountButton: {
    marginRight: 10,
  },
  teamsWrapper: {
    flex: 1,
    width: '100%',
  },
  teamArea: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamTitle: {
    fontSize: 36,
    marginBottom: 10,
    fontFamily: 'numpty-regular',
    color: '#000',
    textAlign: 'center',
  },
  dropBox: {
    fontFamily: 'montserrat-bold',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    width: 200,
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
  onSubmit: PropTypes.func.isRequired,
};

export default Teams;