import {generateRandomInfo, generateDate, generateId} from "../utils/common-mock.js";

const messages = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Not bad`,
];

const emojis = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const autors = [
  `Angelina Jolie`,
  `Nicole Kidman`,
  `Elijah Wood`,
  `Edward Norton`,
  `Joaquin Phoenix`,
];

export const generateComment = () => {
  return {
    id: generateId(),
    author: generateRandomInfo(autors),
    message: generateRandomInfo(messages),
    emotion: generateRandomInfo(emojis) + `.png`,
    date: generateDate(new Date(2006, 0, 1), new Date()),
  };
};

export const generateLocalComment = () => {
  return {
    message: ``,
    date: null,
    emotion: null,
  };
};
