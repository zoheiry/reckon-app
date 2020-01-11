import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TurnInfo from '../../components/TurnInfo';
import Cards from '../../components/Cards';

import Scores from '../Scores';

const TurnScreen = ({ player, words, onEnd }) => {
  const [shouldShowTurnInfo, setShouldShowTurnInfo] = useState(true);
  const [isTurnOver, setIsTurnOver] = useState(false);
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
    const skippedWords = [...turnState.skippedWords];

    if (turnState.remainingWords.length === turnState.skippedWords.length) {
      // only skipped words left
      skippedWords.slice(0);
    }

    setTurnState({ ...turnState, remainingWords, correctWords, skippedWords });

    if (remainingWords.length === 0) {
      handleTurnEnd();
    }
  }

  const handleSkipWord = () => {
    const skippedWords = [...turnState.skippedWords];
    if (turnState.remainingWords.length !== turnState.skippedWords.length) {
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
    const remainingWords = [...words];
    correctWords.forEach(word => {  
      remainingWords.splice(remainingWords.indexOf(word), 1); 
    });
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