import Header from "./view/header.js";
import {generateFilmCard} from "./mock/film-card.js";
import FilmsPresenter from "./presenter/films.js";
import FilterPresenter from "./presenter/filters.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filters.js";
import {render, RenderPosition} from "./utils/render.js";

const COUNT_ALL_FILMS = 22;

const films = new Array(COUNT_ALL_FILMS).fill().map(generateFilmCard);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, new Header(), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

filterPresenter.init();
filmsPresenter.init();
