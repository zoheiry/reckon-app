import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { shuffle } from 'lodash';

import Turn from '../Turn';
import RoundDescription from '../../components/RoundDescription';

const Round = ({ roundNumber, teams, words, onEnd }) => {
  const [shouldShowDescription, setShouldShowDescription] = useState(true);
  useEffect(() => {
    setShouldShowDescription(true);
    setTimeout(() => setShouldShowDescription(false), 6000);
  }, [roundNumber]);

  const [roundState, setRoundState] = useState({
    remainingWords: shuffle(words),
    scores: teams.map(_ => 0),
    currentPlayer: teams[0][0],
  });

  const currentTeam = teams.find(team => team.includes(roundState.currentPlayer));
  const currentTeamIndex = teams.indexOf(currentTeam);
  const currentPlayerIndex = currentTeam.indexOf(roundState.currentPlayer);

  const getRemainingWords = (wordsToRemove) => {
    const newWords = [...roundState.remainingWords];
    wordsToRemove.forEach(word => {
      newWords.splice(newWords.indexOf(word), 1);
    });

    return newWords;
  }

  const getUpdatedScores = (pointsScored = 0) => {
    const teamScore = roundState.scores[currentTeamIndex];
    const updatedScores = [...roundState.scores];
    updatedScores[currentTeamIndex] = teamScore + pointsScored;
    
    return updatedScores;
  }

  const getNextPlayer = () => {
    let nextTeamIndex = currentTeamIndex + 1;
    // same player index in the next team
    let nextPlayerIndex = currentPlayerIndex;
    if (nextTeamIndex >= teams.length) {
      nextTeamIndex = 0;
      // circled back to the first team, so switch to the next player
      nextPlayerIndex++;
    }

    const nextPlayer = teams[nextTeamIndex][nextPlayerIndex];
    
    return nextPlayer;
  }

  const handleTurnEnd = (correctWords = []) => {
    const remainingWords = getRemainingWords(correctWords);
    const scores = getUpdatedScores(correctWords.length);
    const currentPlayer = getNextPlayer();
    setRoundState({ remainingWords, scores, currentPlayer });

    if (remainingWords.length <= 0) {
      onEnd(scores);
    }
  }

  return (
    shouldShowDescription ? (
      <RoundDescription roundNumber={roundNumber} />
    ) : (
      <Turn
        player={roundState.currentPlayer}
        words={roundState.remainingWords}
        onEnd={handleTurnEnd}
      />
    )
  );
};

Round.propTypes = {
  roundNumber: PropTypes.number.isRequired,
  teams: PropTypes.array.isRequired,
  words: PropTypes.array.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default Round;