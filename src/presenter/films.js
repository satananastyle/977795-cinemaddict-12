import Content from "../view/content.js";
import FilmsList from "../view/films-list.js";
import FilmsContainer from "../view/films-container.js";
import FilmPresenter from "./film.js";
import Sort from "../view/sort.js";
import ShowMoreBtn from "../view/show-more.js";
import NoFilms from "../view/no-film.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortRating, sortDate} from "../utils/sort.js";
import {SortType} from "../const.js";

const COUNT_PER_STEP = 5;

export default class Films {
  constructor(siteMainElement) {
    this._siteMainElement = siteMainElement;
    this._renderedCount = COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._siteContent = new Content();
    this._sort = new Sort();
    this._filmsList = new FilmsList();
    this._filmsContainer = new FilmsContainer();
    this._showMoreBtn = new ShowMoreBtn();
    this._noFilmsComponent = new NoFilms();

    this._handlerFilmChange = this._handlerFilmChange.bind(this);
    this._handlerShowMoreBtnClick = this._handlerShowMoreBtnClick.bind(this);
    this._handlerSortTypeChange = this._handlerSortTypeChange.bind(this);
  }

  init(filmCards) {
    this._filmCards = filmCards.slice();
    this._sourcedFilmCards = filmCards.slice();

    this._renderContent();
  }

  _handlerFilmChange(updatedFilm) {
    this._filmCards = updateItem(this._filmCards, updatedFilm);
    this._sourcedFilmCards = updateItem(this._sourcedFilmCards, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._filmCards.sort(sortDate);
        break;
      case SortType.RATING:
        this._filmCards.sort(sortRating);
        break;
      default:
        this._filmCards = this._sourcedFilmCards.slice();
    }

    this._currentSortType = sortType;
  }

  _handlerSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmsList();
    this._renderFilmsList();
  }

  _renderSort() {
    render(this._siteMainElement, this._sort, RenderPosition.BEFOREEND);
    this._sort.setSortTypeChangeHandler(this._handlerSortTypeChange);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmsContainer, this._handlerFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._filmCards
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmsList, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handlerShowMoreBtnClick() {
    this._renderFilms(this._renderedCount, this._renderedCount + COUNT_PER_STEP);
    this._renderedCount += COUNT_PER_STEP;

    if (this._renderedCount >= this._filmCards.length) {
      remove(this._showMoreBtn);
    }
  }

  _renderShowMoreBtn() {

    render(this._filmsContainer, this._showMoreBtn, RenderPosition.AFTEREND);

    this._showMoreBtn.setClickHandler(this._handlerShowMoreBtnClick);
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._filmCards.length, COUNT_PER_STEP));

    if (this._filmCards.length > COUNT_PER_STEP) {
      this._renderShowMoreBtn();
    }
  }

  _clearFilmsList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedCount = COUNT_PER_STEP;
  }

  _renderContent() {
    if (this._filmCards.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();

    render(this._siteMainElement, this._siteContent, RenderPosition.BEFOREEND);
    render(this._siteContent, this._filmsList, RenderPosition.BEFOREEND);
    render(this._filmsList, this._filmsContainer, RenderPosition.BEFOREEND);

    this._renderFilmsList();
  }
}
