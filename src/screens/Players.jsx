import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { compact } from 'lodash';

import Wrapper from '../components/Wrapper';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';

const Players = ({ onSubmit }) => {
  const [names, setNames] = useState(['', '', '', '']);

  const handleChangePlayerName = (name, index) => {
    const newNames = Object.assign([], names, { [index]: name });
    setNames(newNames);
  }

  handleAddPlayer = () => {
    setNames([...names, '']);
  }

  const isDisabled = () => {
    const validNames = compact(names);
    if (validNames.length > 3) {
      return false;
    }
    return true;
  }

  return (
    <Wrapper>
      <Title>Players</Title>
      <ScrollView style={styles.scrollViewWrapper}>
        {names.map((playerName, i) => (
          <Input
            style={styles.inputWrapper}
            placeholder={`Player ${i + 1}`}
            onChangeText={name => handleChangePlayerName(name, i)}
            key={`player-${i}-name-input`}
          />
        ))}
        <TouchableOpacity style={styles.addButtonWrapper} onPress={handleAddPlayer}>
          <Text style={styles.addButton}>+ Add Player</Text>
        </TouchableOpacity>
      </ScrollView>
      <Button
        onPress={() => onSubmit(names)}
        disabled={isDisabled()}
      >
        Next
      </Button>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    marginTop: 30,
    flex: 1,
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 10,
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
};

export default Players;