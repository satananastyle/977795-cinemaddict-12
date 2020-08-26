const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  const random = lower + Math.random() * (upper - lower);
  return random.toFixed(1);
};

const generateRandomInfo = (info) => {

  const randomIndex = getRandomInteger(0, info.length - 1);

  return info[randomIndex];
};

const generateRandomList = (list) => {
  const randomIndex = getRandomInteger(1, list.length - 1);

  const randomList = [];

  for (let i = 0; i <= randomIndex; i++) {
    randomList.push(list[getRandomInteger(0, list.length - 1)]);
  }

  return randomList;
};

const generateDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export {getRandom, getRandomInteger, generateRandomInfo, generateRandomList, generateDate};
