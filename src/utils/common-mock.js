import {getRandomInteger} from "../utils/common.js";

export const generateRandomInfo = (info) => {

  const randomIndex = getRandomInteger(0, info.length - 1);

  return info[randomIndex];
};

export const generateRandomList = (list) => {
  const randomIndex = getRandomInteger(1, list.length - 1);

  const randomList = [];

  for (let i = 0; i <= randomIndex; i++) {
    randomList.push(list[getRandomInteger(0, list.length - 1)]);
  }

  return randomList;
};

export const generateDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
