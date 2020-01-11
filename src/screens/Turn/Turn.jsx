import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TurnInfo from '../../components/TurnInfo';
import Cards from '../../components/Cards';

const TurnScreen = ({ player, words, onEnd }) => {
  const [shouldShowTurnInfo, setShouldShowTurnInfo] = useState(true);
  useEffect(() => {
    setShouldShowTurnInfo(true);
  }, [player]);

  const [turnState, setTurnState] = useState({
    remainingWords: words,
    correctWords: [],
    skippedWords: [],
  });
  const currentWord = turnState.remainingWords[0];

  const handleCorrectWord = () => {
    const remainingWords = turnState.remainingWords.slice(1);
    const correctWords = [...turnState.correctWords, currentWord];

    if (remainingWords.length > 0) {
      setTurnState({ ...turnState, remainingWords, correctWords });
    } else {
      onEnd(correctWords, []);
    }
  }

  const handleSkipWord = () => {
    setTurnState({
      ...turnState,
      // add the skipped words back at the end to be played again.
      remainingWords: [...turnState.remainingWords.slice(1), currentWord],
      skippedWords: [...turnState.skippedWords, currentWord],
    });
  }

  const handleTurnEnd = () => {
    onEnd(turnState.correctWords, turnState.remainingWords);
  }

  return (
    shouldShowTurnInfo ? (
      <TurnInfo currentPlayer={player} onReady={() => setShouldShowTurnInfo(false)} />
    ): (
      <Cards
        word={currentWord}
        onCorrectWord={handleCorrectWord}
        onSkipWord={handleSkipWord}
        onEnd={handleTurnEnd}
      />
    )
  );
};

TurnScreen.propTypes = {
  player: PropTypes.string.isRequired,
  words: PropTypes.array.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default TurnScreen;