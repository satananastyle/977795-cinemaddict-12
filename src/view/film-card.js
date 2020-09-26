import Smart from "./smart.js";
import {formatDurationInMinutes} from "../utils/common-mock.js";

const MAX_DESCRIPTION_LENGHT = 140;

const getShortDescription = (description) => {
  if (description.split(``).length > MAX_DESCRIPTION_LENGHT) {
    description = description.slice(0, MAX_DESCRIPTION_LENGHT) + `...`;
  }
  return description;
};

const getControlsItemClass = (isActive) => {
  const classActiveButton = isActive
    ? `film-card__controls-item--active`
    : ``;

  return classActiveButton;
};

const renderFilmCardControls = (isWatchlist, isWatched, isFavorite) => {
  return (
    `<form class="film-card__controls">
       <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getControlsItemClass(isWatchlist)}">Add to watchlist</button>
       <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getControlsItemClass(isWatched)}">Mark as watched</button>
       <button class="film-card__controls-item button film-card__controls-item--favorite ${getControlsItemClass(isFavorite)}">Mark as favorite</button>
     </form>`
  );
};

const createFilmCardTemplate = (filmCard) => {
  const {title, poster, description, release, rating, genres, duration, isWatchlist, isWatched, isFavorite, reactions} = filmCard;
  const shortDescription = getShortDescription(description);
  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${release.getFullYear()}</span>
          <span class="film-card__duration">${formatDurationInMinutes(duration)}</span>
          <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${shortDescription}</p>
        <a class="film-card__comments">${reactions.length} comments</a>
        ${renderFilmCardControls(isWatchlist, isWatched, isFavorite)}
      </article>`
  );
};

export default class FilmCard extends Smart {
  constructor(data) {
    super();
    this._data = data;
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._callback.watchlistClick();
    this.updateData({isWatchlist: !this._data.isWatchlist}, true);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._callback.watchedClick();
    this.updateData({isWatched: !this._data.isWatched}, true);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    this._callback.favoriteClick();
    this.updateData({isFavorite: !this._data.isFavorite}, true);
  }

  setClickHandler(selector, callback) {
    this._callback.click = callback;
    this.getElement().querySelector(selector).addEventListener(`click`, this._clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }

  restoreHandlers() {
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);

    this.setHandler(this._callback.click);
  }
}
