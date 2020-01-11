import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ScreenOrientation } from 'expo';

import DefaultLayout from '../layouts/Default';
import Start from '../screens/Start';
import Players from '../screens/Players';
import Teams from '../screens/Teams';
import Words from '../screens/Words';
import Game from '../screens/Game';
import Scores from '../screens/Scores';

import { getNextStep, getPrevStep } from '../utils/steps';
import { START, PLAYERS, TEAMS, WORDS, GAME, SCORE, END } from '../constants/appStates';

// const INITIAL_ORIENTATION = ScreenOrientation.OrientationLock.PORTRAIT;
const INITIAL_ORIENTATION = ScreenOrientation.OrientationLock.LANDSCAPE;

const Main = () => {
  const [step, setStep] = useState(START);
  const [orientation, setOrientation] = useState(INITIAL_ORIENTATION);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    (async () => {
      await ScreenOrientation.lockAsync(INITIAL_ORIENTATION);
      ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
        setOrientation(orientationInfo.orientation);
      });
    })();
  }, []);

  const canGoToPrevStep = () => {
    return true;
  };

  const canGoToNextStep = () => {
    return true;
  };

  const goToNextStep = () => {
    if (canGoToNextStep()) {
      const nextStep = getNextStep(step);
      setStep(nextStep);
    }
  };

  const goToPrevStep = () => {
    if (canGoToPrevStep()) {
      const prevStep = getPrevStep(step);
      setStep(prevStep);
    }
  };

  const handleSubmitPlayers = (playerNames) => {
    setPlayers(playerNames);
    goToNextStep();
  };

  const handleSubmitTeams = (teams) => {
    setTeams(teams);
    goToNextStep(); 
  };

  const handleSubmitWords = (words) => {
    setWords(words);
    goToNextStep();
  };

  let withBackButton = true;
  let screenComponent;
  switch (step) {
    case START:
      withBackButton = false;
      // screenComponent = <Start onStart={goToNextStep} />;
      screenComponent = <Game teams={[['Ali', 'Mariem'], ['Omar', 'Sally']]} words={['Dog', 'Cat', 'Penguin', 'Lion', 'Goerge Clooney', 'Angelina Jolie', 'Gone with the wind', 'Lord of the rings']} />;
      // screenComponent = <Scores correctWords={['Dog', 'Cat', 'Penguin', 'Lion', 'Goerge Clooney']} skippedWords={['Angelina Jolie', 'Gone with the wind', 'Lord of the rings']} onConfirm={() => null} />;
      break;
    case PLAYERS:
      screenComponent = <Players onSubmit={handleSubmitPlayers} players={players} />;
      break;
    case TEAMS:
      screenComponent = <Teams players={players} onSubmit={handleSubmitTeams} />;
      break;
    case WORDS:
      screenComponent = <Words players={players} onSubmit={handleSubmitWords} />;
      break;
    case GAME:
      withBackButton = false;
      screenComponent = <Game teams={teams} words={words} />;
      break;
  }

  return (
    <DefaultLayout
      onBackPress={goToPrevStep}
      onSettingsPress={() => null}
      withBackButton={withBackButton}
      orientation={orientation}
    >
      <StatusBar hidden />
      {screenComponent}
    </DefaultLayout>
  );
};

export default Main;