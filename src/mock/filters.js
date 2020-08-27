const filmToFilterMap = {
  Watchlist: (films) => films.filter((film) => !film.isWatchlist).length,
  History: (films) => films.filter((film) => !film.isWatched).length,
  Favorites: (films) => films.filter((film) => !film.isFavorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countfilms]) => {
    return {
      name: filterName,
      count: countfilms(films),
    };
  });
};
