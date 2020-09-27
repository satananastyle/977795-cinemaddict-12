import FilmCard from "../view/film-card.js";
import FilmDetails from "../view/film-details.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  SHOW: `SHOW`
};

export default class Film {
  constructor(filmsContainer, changeData, changeMode) {
    this._filmsContainer = filmsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._filmCard = null;
    this._filmDetails = null;

    this._handlerShowClick = this._handlerShowClick.bind(this);
    this._handlerCloseDetails = this._handlerCloseDetails.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handlerWatchlistClick = this._handlerWatchlistClick.bind(this);
    this._handlerWatchedClick = this._handlerWatchedClick.bind(this);
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);

    this._handlerEmojiClick = this._handlerEmojiClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCard = this._filmCard;
    const prevFilmDetails = this._filmDetails;

    this._filmCard = new FilmCard(film);
    this._filmDetails = new FilmDetails(film);

    this._filmCard.setHandler(this._handlerShowClick);

    this._filmCard.setWatchlistClickHandler(this._handlerWatchlistClick);
    this._filmCard.setWatchedClickHandler(this._handlerWatchedClick);
    this._filmCard.setFavoriteClickHandler(this._handlerFavoriteClick);

    this._filmDetails.setClickHandler(this._handlerCloseDetails);
    this._filmDetails.setWatchlistClickHandler(this._handlerWatchlistClick);
    this._filmDetails.setWatchedClickHandler(this._handlerWatchedClick);
    this._filmDetails.setFavoriteClickHandler(this._handlerFavoriteClick);
    this._filmDetails.setEmojiClickHandler(this._handlerEmojiClick);


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

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      remove(this._filmDetails);
    }
  }

  _handlerShowClick() {
    this._changeMode();
    this._filmDetails.updateElement();
    render(this._filmsContainer, this._filmDetails, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escKeyDownHandler);

    this._mode = Mode.SHOW;
  }

  _handlerCloseDetails() {
    remove(this._filmDetails);
    this._mode = Mode.DEFAULT;
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
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
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
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
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
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handlerEmojiClick() {
  }
}
