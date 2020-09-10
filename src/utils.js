export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  const random = lower + Math.random() * (upper - lower);
  return random.toFixed(1);
};

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

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const RenderPosition = {
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
