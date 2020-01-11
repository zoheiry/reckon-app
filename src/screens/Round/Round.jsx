import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { shuffle, isEmpty } from 'lodash';

import Turn from '../Turn';
import RoundDescription from '../../components/RoundDescription';

const shuffleWords = (wordsById) => {
  const wordIds = shuffle(Object.keys(wordsById));
  return wordIds.reduce((acc, wordId) => ({ ...acc, [wordId]: wordsById[wordId] }), {});
};

const Round = ({ roundNumber, teams, wordsById, onEnd }) => {
  const [shouldShowDescription, setShouldShowDescription] = useState(true);
  useEffect(() => {
    setShouldShowDescription(true);
    setTimeout(() => setShouldShowDescription(false), 6000);
    // update score and words on a new round but keep currentPlayer the same
    setRoundState({
      ...roundState,
      scores: teams.map(() => 0),
      remainingWordsById: shuffleWords(wordsById),
    });
  }, [roundNumber]);

  const [roundState, setRoundState] = useState({
    remainingWordsById: shuffleWords(wordsById),
    scores: teams.map(() => 0),
    currentPlayer: teams[0][0],
  });

  const currentTeam = teams.find(team => team.includes(roundState.currentPlayer));
  const currentTeamIndex = teams.indexOf(currentTeam);
  const currentPlayerIndex = currentTeam.indexOf(roundState.currentPlayer);

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

  const handleTurnEnd = (pointsScored = 0, remainingWordsById) => {
    const scores = getUpdatedScores(pointsScored);
    if (isEmpty(remainingWordsById)) {
      onEnd(scores);
    } else {
      const currentPlayer = getNextPlayer();
      setRoundState({ remainingWordsById, scores, currentPlayer });
    }
  }

  return (
    shouldShowDescription ? (
      <RoundDescription roundNumber={roundNumber} />
    ) : (
      <Turn
        player={roundState.currentPlayer}
        wordsById={roundState.remainingWordsById}
        onEnd={handleTurnEnd}
      />
    )
  );
};

Round.propTypes = {
  roundNumber: PropTypes.number.isRequired,
  teams: PropTypes.array.isRequired,
  wordsById: PropTypes.object.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default Round;