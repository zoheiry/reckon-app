import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TurnInfo from '../../components/TurnInfo';
import Cards from '../../components/Cards';

import Scores from '../Scores';

const TurnScreen = ({ player, words, onEnd }) => {
  const [shouldShowTurnInfo, setShouldShowTurnInfo] = useState(true);
  const [isTurnOver, setIsTurnOver] = useState(false);
  // TODO: check if this effect is need or if changing the player prop already sets turnInfo to true
  useEffect(() => { setShouldShowTurnInfo(true) }, [player]);

  const [turnState, setTurnState] = useState({
    remainingWords: words,
    correctWords: [],
    skippedWords: [],
  });
  useEffect(() => {
    if (turnState.remainingWords.length === 0) {
      handleTurnEnd();
    }
  }, [turnState.remainingWords]);
  const currentWord = turnState.remainingWords[0] || {};

  const handleCorrectWord = () => {
    const remainingWords = turnState.remainingWords.slice(1);
    const correctWords = [...turnState.correctWords, currentWord];
    // remove from skipped words if it was there.
    const skippedWords = turnState.skippedWords.filter(({ id }) => id !== currentWord.id);

    setTurnState({ ...turnState, remainingWords, correctWords, skippedWords });
  }

  const handleSkipWord = () => {
    const skippedWords = [...turnState.skippedWords];
    if (!skippedWords.find(({ id }) => id === currentWord.id)) {
      // only add to skipped words if it wasn't added before.
      skippedWords.push(currentWord);
    }
    setTurnState({
      ...turnState,
      // add the skipped words back at the end to be played again.
      remainingWords: [...turnState.remainingWords.slice(1), currentWord],
      skippedWords,
    });
  }

  const handleTurnEnd = () => {
    setIsTurnOver(true);
  }

  const handleConfirmScore = (correctWords) => {
    const correctWordIds = correctWords.map((word) => word.id);
    const remainingWords = words.filter(({ id }) => !correctWordIds.includes(id));
    onEnd(correctWords, remainingWords);
  } 

  if (isTurnOver) {
    return (
      <Scores
        correctWords={turnState.correctWords}
        skippedWords={turnState.skippedWords}
        onConfirm={handleConfirmScore}
      />
    );
  }

  return (
    shouldShowTurnInfo ? (
      <TurnInfo currentPlayer={player} onReady={() => setShouldShowTurnInfo(false)} />
    ): (
      <Cards
        word={currentWord.label}
        onCorrectWord={handleCorrectWord}
        onSkipWord={handleSkipWord}
        onEnd={handleTurnEnd}
      />
    )
  );
};

TurnScreen.propTypes = {
  player: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default TurnScreen;