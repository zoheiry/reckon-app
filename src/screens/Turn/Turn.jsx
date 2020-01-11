import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TurnInfo from '../../components/TurnInfo';
import Turn from '../../components/Turn';

const TurnScreen = ({ player, words, onEnd }) => {
  const [shouldShowTurnInfo, setShouldShowTurnInfo] = useState(true);
  useEffect(() => {
    setShouldShowTurnInfo(true);
  }, [player]);

  const [correctWords, setCorrectWords] = useState([]);
  const [skippedWords, setSkippedWords] = useState([]);

  const handleCorrectWord = (word) => {
    setCorrectWords([...correctWords, word ]);
  }

  const handleSkipWord = (word) => {
    setSkippedWords([...skippedWords, word ]);
  }

  const handleTurnEnd = () => {
    onEnd(correctWords);
  }

  return (
    shouldShowTurnInfo ? (
      <TurnInfo currentPlayer={player} onReady={() => setShouldShowTurnInfo(false)} />
    ): (
      <Turn
        words={words}
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