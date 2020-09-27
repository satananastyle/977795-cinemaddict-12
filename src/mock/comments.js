import {generateRandomInfo, generateDate, generateId} from "../utils/common-mock.js";

const messages = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Not bad`,
];

const emojis = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`,
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
    emoji: generateRandomInfo(emojis),
    date: generateDate(new Date(2006, 0, 1), new Date()),
  };
};

export const generateLocalComment = () => {
  return {
    comment: null,
    date: null,
    emotion: null,
  };
};
