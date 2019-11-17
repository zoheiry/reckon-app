import { ANIMALS, CELEBRITIES, MOVIES } from '../constants/CategoryTypes';
import animalsJson from '../data/animals.json';
import moviesJson from '../data/movies.json';
import celebritiesJson from '../data/celebrities.json';

const WORDS_BY_CATEGORY = {
  [ANIMALS]: animalsJson.list,
  [CELEBRITIES]: celebritiesJson.list,
  [MOVIES]: moviesJson.list,
};

export const getRandomWordForCategory = (category) => {
  const words = WORDS_BY_CATEGORY[category];
  const randomNumber = Math.floor(Math.random() * words.length);
  return words[randomNumber];
};

export const getRandomAnimal = () => getRandomWordForCategory(ANIMALS);

export const getRandomCelebrity = () => getRandomWordForCategory(CELEBRITIES);

export const getRandomMovie = () => getRandomWordForCategory(MOVIES);