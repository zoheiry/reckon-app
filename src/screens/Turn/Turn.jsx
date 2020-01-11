import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, omit } from 'lodash';

import TurnInfo from '../../components/TurnInfo';
import Cards from '../../components/Cards';

import Scores from '../Scores';

const TurnScreen = ({ player, wordsById, onEnd }) => {
  const [shouldShowTurnInfo, setShouldShowTurnInfo] = useState(true);
  const [isTurnOver, setIsTurnOver] = useState(false);
  // TODO: check if this effect is need or if changing the player prop already sets turnInfo to true
  useEffect(() => {
    setIsTurnOver(false);
    setShouldShowTurnInfo(true);
  }, [player]);

  const [turnState, setTurnState] = useState({
    remainingWordIds: Object.keys(wordsById),
    correctWordIds: [],
    skippedWordIds: [],
  });
  useEffect(() => {
    if (isEmpty(turnState.remainingWordIds)) {
      handleTurnEnd();
    }
  }, [turnState.remainingWordIds]);
  const currentWordId = turnState.remainingWordIds[0];

  const handleCorrectWord = () => {
    const remainingWordIds = turnState.remainingWordIds.slice(1);
    const correctWordIds = [...turnState.correctWordIds, currentWordId];
    // remove from skipped words if it was there.
    const skippedWordIds = turnState.skippedWordIds.filter(id => id !== currentWordId);

    setTurnState({ remainingWordIds, correctWordIds, skippedWordIds });
  }

  const handleSkipWord = () => {
    const skippedWordIds = [...turnState.skippedWordIds];
    if (!skippedWordIds.includes(currentWordId)) {
      // only add to skipped words if it wasn't added before.
      skippedWordIds.push(currentWordId);
    }
    setTurnState({
      ...turnState,
      // add the skipped words back at the end to be played again.
      remainingWordIds: [...turnState.remainingWordIds.slice(1), currentWordId],
      skippedWordIds,
    });
  }

  const handleTurnEnd = () => {
    setIsTurnOver(true);
  }

  const handleConfirmScore = (correctWordIds) => {
    const remainingWordsById = omit(wordsById, correctWordIds);
    const points = correctWordIds.length;
    onEnd(points, remainingWordsById);
  } 

  if (isTurnOver) {
    return (
      <Scores
        correctWordIds={turnState.correctWordIds}
        skippedWordIds={turnState.skippedWordIds}
        wordsById={wordsById}
        onConfirm={handleConfirmScore}
      />
    );
  }

  return (
    shouldShowTurnInfo ? (
      <TurnInfo currentPlayer={player} onReady={() => setShouldShowTurnInfo(false)} />
    ): (
      <Cards
        word={wordsById[currentWordId]}
        onCorrectWord={handleCorrectWord}
        onSkipWord={handleSkipWord}
        onEnd={handleTurnEnd}
      />
    )
  );
};

TurnScreen.propTypes = {
  player: PropTypes.string.isRequired,
  wordsById: PropTypes.object.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default TurnScreen;