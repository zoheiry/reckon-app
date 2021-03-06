import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScreenOrientation } from 'expo';

import Round from '../Round';

const getWordsById = (words) => words.reduce((wordsMap, word, i) => ({
  ...wordsMap,
  [`w${i}`]: word,
}), {});

const Game = ({ teams, words }) => {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  const initialRoundNumber = 1;
  const initialTeamScores = teams.map(() => 0);
  const [roundNumber, setRoundNumber] = useState(initialRoundNumber);
  const [teamScores, setTeamScores] = useState(initialTeamScores);

  const nextRound = () => {
    const nextRoundNumber = roundNumber + 1;
    setRoundNumber(nextRoundNumber);
  }

  const updateScores = (roundScores) => {
    const updatedTeamScores = teamScores.map(
      (currentScore, teamIndex) => currentScore + roundScores[teamIndex]
    );
    setTeamScores(updatedTeamScores);
  }

  const handleRoundEnd = (roundScores) => {
    updateScores(roundScores);
    nextRound();
  }

  return (
    <Round
      roundNumber={roundNumber}
      teams={teams}
      wordsById={getWordsById(words)}
      onEnd={handleRoundEnd}
    />
  );
};

Game.propTypes = {
  teams: PropTypes.array.isRequired,
  words: PropTypes.array.isRequired,
};

export default Game;