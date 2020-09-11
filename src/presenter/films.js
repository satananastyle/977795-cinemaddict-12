import Content from "../view/content.js";
import FilmsList from "../view/films-list.js";
import FilmsContainer from "../view/films-container.js";
import FilmCard from "../view/film-card.js";
import ShowMoreBtn from "../view/show-more.js";
import FilmDetails from "../view/film-details.js";
import NoFilms from "../view/no-film.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const COUNT_PER_STEP = 5;

export default class Films {
  constructor(siteMainElement) {
    this._siteMainElement = siteMainElement;
    this._renderedCount = COUNT_PER_STEP;

    this._siteContent = new Content();
    this._filmsList = new FilmsList();
    this._filmsContainer = new FilmsContainer();
    this._showMoreBtn = new ShowMoreBtn();

    this._handleShowMoreBtnClick = this._handleShowMoreBtnClick.bind(this);

    this._noFilmsComponent = new NoFilms();
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();

    render(this._siteMainElement, this._siteContent, RenderPosition.BEFOREEND);
    render(this._siteContent, this._filmsList, RenderPosition.BEFOREEND);
    render(this._filmsList, this._filmsContainer, RenderPosition.BEFOREEND);


    this._renderContent();
  }

  _renderFilm(container, film) {
    const filmCard = new FilmCard(film);
    const filmDetails = new FilmDetails(film);

    const showDetails = () => {
      render(container, filmDetails, RenderPosition.BEFOREEND);
    };

    const hiddenDetails = () => {
      remove(filmDetails);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        hiddenDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCard.setClickHandler(`.film-card__title`, () => {
      showDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmCard.setClickHandler(`.film-card__poster`, () => {
      showDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmCard.setClickHandler(`.film-card__comments`, () => {
      showDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmDetails.setClickHandler(() => {
      hiddenDetails();
    });

    render(container, filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((film) => this._renderFilm(this._filmsContainer, film));
  }

  _renderNoFilms() {
    render(this._filmsList, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreBtnClick() {
    this._renderFilms(this._renderedCount, this._renderedCount + COUNT_PER_STEP);
    this._renderedCount += COUNT_PER_STEP;

    if (this._renderedCount >= this._filmCards.length) {
      remove(this._showMoreBtn);
    }
  }

  _renderShowMoreBtn() {

    render(this._filmsContainer, this._showMoreBtn, RenderPosition.AFTEREND);

    this._showMoreBtn.setClickHandler(this._handleShowMoreBtnClick);
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._filmCards.length, COUNT_PER_STEP));

    if (this._filmCards.length > COUNT_PER_STEP) {
      this._renderShowMoreBtn();
    }
  }

  _renderContent() {
    if (this._filmCards.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmsList();
  }
}
