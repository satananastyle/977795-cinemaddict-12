export const sortRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export const sortDate = (filmA, filmB) => {
  return filmB.release - filmA.release;
};

