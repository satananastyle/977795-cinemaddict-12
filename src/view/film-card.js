const MAX_DESCRIPTION_LENGHT = 140;

const getShortDescription = (description) => {
  if (description.split(``).length > MAX_DESCRIPTION_LENGHT) {
    description = description.slice(0, MAX_DESCRIPTION_LENGHT) + `...`;
  }
  return description;
};

export const createFilmCardTemplate = (filmCard) => {
  const {title, poster, comments, description, release, rating, genres, runtime} = filmCard;
  const shortDescription = getShortDescription(description);
  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${release.getFullYear()}</span>
          <span class="film-card__duration">${runtime.hours}h ${runtime.min}m</span>
          <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${shortDescription}</p>
        <a class="film-card__comments">${comments} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`
  );
};
