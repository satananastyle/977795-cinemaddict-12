const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortRating = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.rating, filmB.rating);

  if (weight !== null) {
    return weight;
  }

  return filmB.rating - filmA.rating;
};

export const sortDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.release, filmB.release);

  if (weight !== null) {
    return weight;
  }

  return filmB.release - filmA.release;
};

export const changeActiveSort = (evt) => {
  document.querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
  evt.target.classList.add(`sort__button--active`);
};
