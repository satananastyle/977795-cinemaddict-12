import {createHeaderTemplate} from "./view/header-template.js";
import {createNavigationTemplate} from "./view/navigation-template.js";
import {createSortTemplate} from "./view/sort-temlpate.js";
import {createFilmsListTemplate} from "./view/films-list-template.js";
import {createFilmCardTemplate} from "./view/film-card-template.js";
import {createFilmsExtraTemplate} from "./view/films-extra-template.js";

const COUNT_ALL_FILMS = 5;
const COUNT_TOP_FILMS = 2;

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
  render(siteFilmsListElement, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < COUNT_TOP_FILMS; i++) {
  render(siteContentElement, createFilmsExtraTemplate(), `beforeend`);
}

const siteFilmsExtraListElements = document.querySelectorAll(`.films-list--extra .films-list__container`);

siteFilmsExtraListElements.forEach((element) => {
  for (let i = 0; i < COUNT_TOP_FILMS; i++) {
    render(element, createFilmCardTemplate(), `beforeend`);
  }
});
