import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { compact, uniq } from 'lodash';

import Wrapper from '../components/Wrapper';
import Title from '../components/Title';
import Input from '../components/Input';
import CtaWrapper from '../components/CtaWrapper';
import Button from '../components/Button';

const MINIMUM_PLAYERS_COUNT = 4;

const Players = ({ onSubmit, players = [] }) => {
  const initialNames = players.length ? players : Array(MINIMUM_PLAYERS_COUNT).fill('');
  const [names, setNames] = useState(initialNames);

  const getValidNames = () =>
    compact(uniq(names));

  const isFormValid = () => {
    const validNames = getValidNames();
    if (validNames.length >= MINIMUM_PLAYERS_COUNT) {
      return true;
    }
    return false;
  }

  const handleChangePlayerName = (name, index) => {
    const newNames = Object.assign([], names, { [index]: name });
    setNames(newNames);
  }

  handleAddPlayer = () => {
    const newPlayer = '';
    setNames([...names, newPlayer]);
  }

  handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }

    onSubmit(getValidNames());
  }

  return (
    <Wrapper>
      <Title>Players</Title>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewWrapper}>
        {names.map((playerName, i) => (
          <Input
            style={styles.inputWrapper}
            placeholder={`Player ${i + 1}`}
            value={names[i]}
            onChangeText={name => handleChangePlayerName(name, i)}
            key={`player-${i}-name-input`}
            autoCorrect={false}
          />
        ))}
        <TouchableOpacity style={styles.addButtonWrapper} onPress={handleAddPlayer}>
          <Text style={styles.addButton}>+ Add Player</Text>
        </TouchableOpacity>
      </ScrollView>
      <CtaWrapper>
        <Button onPress={handleSubmit} disabled={!isFormValid()}>
          Next
        </Button>
      </CtaWrapper>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    flex: 1,
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  addButtonWrapper: {
    flex: 1,
    width: '100%',
  },
  addButton: {
    fontFamily: 'montserrat-bold',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
    color: '#ff6d4b',
  }
});

Players.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  players: PropTypes.array,
};

export default Players;