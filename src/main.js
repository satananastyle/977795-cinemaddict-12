import Header from "./view/header.js";
import Filter from "./view/navigation.js";
import Sort from "./view/sort.js";
import {generateFilmCard} from "./mock/film-card.js";
import {generateFilter} from "./mock/filters.js";
import {render, RenderPosition} from "./utils/render.js";
import FilmsPresenter from "./presenter/films.js";

const COUNT_ALL_FILMS = 22;
// const COUNT_TOP_FILMS = 2;

const filmCards = new Array(COUNT_ALL_FILMS).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new Header(), RenderPosition.BEFOREEND);
render(siteMainElement, new Filter(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(siteMainElement);
filmsPresenter.init(filmCards);


// for (let i = 0; i < COUNT_TOP_FILMS; i++) {
//   render(siteContent.getElement(), new FilmsExtra().getElement(), RenderPosition.BEFOREEND);
// }

// const siteFilmsExtraListElements = document.querySelectorAll(`.films-list--extra .films-list__container`);

// siteFilmsExtraListElements.forEach((element) => {
//   for (let i = 0; i < COUNT_TOP_FILMS; i++) {
//     renderFilm(element, filmCards[i]);
//   }
// });
