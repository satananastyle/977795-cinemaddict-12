import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

export default class Film {
  constructor(filmsContainer, changeData) {
    this._filmsContainer = filmsContainer;
    this._changeData = changeData;

    this._filmCard = null;
    this._filmDetails = null;

    this._handlerShowClick = this._handlerShowClick.bind(this);
    this._handlerCloseDetails = this._handlerCloseDetails.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handlerWatchlistClick = this._handlerWatchlistClick.bind(this);
    this._handlerWatchedClick = this._handlerWatchedClick.bind(this);
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevFilmDetails = this._filmDetails;

    this._filmCard = new FilmCard(film);
    this._filmDetails = new FilmDetails(film);

    this._filmCard.setClickHandler(`.film-card__title`, this._handlerShowClick);
    this._filmCard.setClickHandler(`.film-card__poster`, this._handlerShowClick);
    this._filmCard.setClickHandler(`.film-card__comments`, this._handlerShowClick);

    this._filmCard.setWatchlistClickHandler(this._handlerWatchlistClick);
    this._filmCard.setWatchedClickHandler(this._handlerWatchedClick);
    this._filmCard.setFavoriteClickHandler(this._handlerFavoriteClick);


    if (prevFilmCard === null || prevFilmDetails === null) {
      render(this._filmsContainer, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmsContainer.getElement().contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    if (this._filmsContainer.getElement().contains(prevFilmDetails.getElement())) {
      replace(this._filmDetails, prevFilmDetails);
    }

    remove(prevFilmCard);
    remove(prevFilmDetails);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmDetails);
  }

  _handlerShowClick() {
    render(this._filmsContainer, this._filmDetails, RenderPosition.BEFOREEND);
    this._filmDetails.setClickHandler(this._handlerCloseDetails);
    this._filmDetails.setWatchlistClickHandler(this._handlerWatchlistClick);
    this._filmDetails.setWatchedClickHandler(this._handlerWatchedClick);
    this._filmDetails.setFavoriteClickHandler(this._handlerFavoriteClick);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handlerCloseDetails(film) {
    this._changeData(film);
    remove(this._filmDetails);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._handlerCloseDetails(this._film);
    }
  }

  _handlerWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

  _handlerWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handlerFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }
}
