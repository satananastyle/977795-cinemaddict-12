export const sortRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export const sortDate = (filmA, filmB) => {
  return filmB.release - filmA.release;
};

export const changeActiveSort = (evt) => {
  document.querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
  evt.target.classList.add(`sort__button--active`);
};
