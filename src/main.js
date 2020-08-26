import {createHeaderTemplate} from "./view/header.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmsExtraTemplate} from "./view/films-extra.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {generateFilmCard} from "./mock/film-card.js";
import {generateComment} from "./mock/comments.js";

const COUNT_ALL_FILMS = 5;
const COUNT_TOP_FILMS = 2;

const filmCards = new Array(COUNT_ALL_FILMS).fill().map(generateFilmCard);
const reactions = new Array(COUNT_ALL_FILMS).fill().map(generateComment);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createHeaderTemplate(), `beforeend`);
render(siteMainElement, createNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const siteContentElement = document.querySelector(`.films`);

const siteFilmsListElement = document.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < COUNT_ALL_FILMS; i++) {
  render(siteFilmsListElement, createFilmCardTemplate(filmCards[i], reactions[i]), `beforeend`);
}

for (let i = 0; i < COUNT_TOP_FILMS; i++) {
  render(siteContentElement, createFilmsExtraTemplate(), `beforeend`);
}

const siteFilmsExtraListElements = document.querySelectorAll(`.films-list--extra .films-list__container`);

siteFilmsExtraListElements.forEach((element) => {
  for (let i = 0; i < COUNT_TOP_FILMS; i++) {
    render(element, createFilmCardTemplate(filmCards[i], reactions), `beforeend`);
  }
});

render(siteMainElement, createFilmDetailsTemplate(filmCards[0], reactions), `beforeend`);
