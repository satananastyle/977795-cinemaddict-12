import Content from "../view/content.js";
import FilmsList from "../view/films-list.js";
import FilmsContainer from "../view/films-container.js";
import FilmPresenter from "./film.js";
import Sort from "../view/sort.js";
import ShowMoreBtn from "../view/show-more.js";
import NoFilms from "../view/no-film.js";
import {filter} from "../utils/filters.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortRating, sortDate} from "../utils/sort.js";
import {SortType, UpdateType, UserAction} from "../const.js";

const COUNT_PER_STEP = 5;

export default class Films {
  constructor(siteMainElement, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._siteMainElement = siteMainElement;
    this._renderedFilmCount = COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._sort = null;
    this._showMoreBtn = null;

    this._siteContent = new Content();
    this._filmsList = new FilmsList();
    this._filmsContainer = new FilmsContainer();
    this._noFilms = new NoFilms();

    this._handlerViewAction = this._handlerViewAction.bind(this);
    this._handlerModelEvent = this._handlerModelEvent.bind(this);
    this._handlerModeChange = this._handlerModeChange.bind(this);
    this._handlerShowMoreBtnClick = this._handlerShowMoreBtnClick.bind(this);
    this._handlerSortTypeChange = this._handlerSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handlerModelEvent);
    this._filterModel.addObserver(this._handlerModelEvent);
  }

  init() {
    this._renderContent();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(sortDate);
      case SortType.RATING:
        return filtredFilms.sort(sortRating);
    }

    return filtredFilms;
  }

  _handlerModeChange() {
    Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.resetView());
  }

  _handlerViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handlerModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearContent();
        this._renderContent();
        break;
      case UpdateType.MAJOR:
        this._clearContent({resetRenderedFilmCount: true, resetSortType: true});
        this._renderContent();
        break;
    }
  }

  _handlerSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearContent({resetRenderedFilmCount: true});
    this._renderContent();
  }

  _renderSort() {
    if (this._sort !== null) {
      this._sort = null;
    }

    this._sort = new Sort(this._currentSortType);
    this._sort.setSortTypeChangeHandler(this._handlerSortTypeChange);
    render(this._siteMainElement, this._sort, RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmsContainer, this._handlerViewAction, this._handlerModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmsList, this._noFilms, RenderPosition.BEFOREEND);
  }

  _handlerShowMoreBtnClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreBtn);
    }
  }

  _renderShowMoreBtn() {
    if (this._showMoreBtn !== null) {
      this._showMoreBtn = null;
    }

    this._showMoreBtn = new ShowMoreBtn();
    this._showMoreBtn.setClickHandler(this._handlerShowMoreBtnClick);

    render(this._filmsContainer, this._showMoreBtn, RenderPosition.AFTEREND);
  }

  _renderContent() {
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    render(this._siteMainElement, this._siteContent, RenderPosition.BEFOREEND);
    render(this._siteContent, this._filmsList, RenderPosition.BEFOREEND);
    render(this._filmsList, this._filmsContainer, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));
    console.log(this._renderedFilmCount);
    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreBtn();
    }
  }

  _clearContent({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sort);
    remove(this._noFilms);
    remove(this._showMoreBtn);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
