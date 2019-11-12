import React, { useState } from 'react';

import DefaultLayout from '../layouts/Default';
import Start from '../screens/Start';
import Players from '../screens/Players';
import Teams from '../screens/Teams';

import { getNextStep, getPrevStep } from '../utils/steps';
import { START, PLAYERS, TEAMS, PLAY, SCORE, END } from '../constants/appStates';

const Main = () => {
  const [step, setStep] = useState(START);
  const [players, setPlayers] = useState([]);

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
  }

  const defaultLayoutProps = {
    onBackPress: () => goToPrevStep(),
    onSettingsPress: () => null,
  };

  let withBackButton = true;
  let screenComponent;
  switch (step) {
    case START:
      withBackButton = false;
      // screenComponent = <Start onStart={goToNextStep} />;
      screenComponent = <Teams players={['Ali', 'Omar', 'Mariem', 'Sally', '', '']} onStart={goToNextStep} />;
      break;
    case PLAYERS:
      screenComponent = <Players onSubmit={handleSubmitPlayers}/>;
      break;
    case TEAMS:
      screenComponent = <Teams players={players} onStart={goToNextStep} />;
      break;
  }

  return (
    <DefaultLayout {...defaultLayoutProps} withBackButton={withBackButton}>
      {screenComponent}
    </DefaultLayout>
  );
};

export default Main;