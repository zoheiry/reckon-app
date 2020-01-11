import { START, PLAYERS, TEAMS, WORDS, GAME, SCORE, END } from '../constants/appStates';

const STEPS_IN_ORDER = [START, PLAYERS, TEAMS, WORDS, GAME, SCORE, END];

const isValidStep = (step) => {
  if (STEPS_IN_ORDER.includes(step)) {
    return true;
  }

  return false;
}

const throwInvalidStepError = (step) => {
  throw new Error(`Invalid step "${step}", was expecting one of ${STEPS_IN_ORDER.toString()}`);
}

const getStepInDirection = (step, direction) => {
  if (isValidStep(step)) {
    const currentStepIndex = STEPS_IN_ORDER.indexOf(step);
    if (direction === 'next') {
      return STEPS_IN_ORDER[currentStepIndex + 1];
    } else if (direction === 'prev') {
      return STEPS_IN_ORDER[currentStepIndex - 1];
    } else {
      throw new Error(`Invalid direction "${direction}", was expecting one of "next", "prev"`);
    }
  }
  throwInvalidStepError(step);
}

export const getNextStep = (step) => getStepInDirection(step, 'next');

export const getPrevStep = (step) => getStepInDirection(step, 'prev');