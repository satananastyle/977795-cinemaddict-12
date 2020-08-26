import {createHeaderTemplate} from "./view/header.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createBtnShowMore} from "./view/show-more.js";
import {createFilmsExtraTemplate} from "./view/films-extra.js";

import {createFilmDetailsTemplate} from "./view/film-details.js";
import {generateFilmCard} from "./mock/film-card.js";
import {generateComment} from "./mock/comments.js";
import {generateFilter} from "./mock/filters.js";

const COUNT_ALL_FILMS = 22;
const COUNT_TOP_FILMS = 2;
const COUNT_PER_STEP = 5;

const filmCards = new Array(COUNT_ALL_FILMS).fill().map(generateFilmCard);
const reactions = new Array(COUNT_ALL_FILMS).fill().map(generateComment);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createHeaderTemplate(), `beforeend`);
render(siteMainElement, createNavigationTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const siteContentElement = document.querySelector(`.films`);

const siteFilmsListElement = document.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < Math.min(filmCards.length, COUNT_PER_STEP); i++) {
  render(siteFilmsListElement, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

if (filmCards.length > COUNT_PER_STEP) {
  let renderedCount = COUNT_PER_STEP;
  render(siteFilmsListElement, createBtnShowMore(), `afterend`);

  const showMoreBtn = siteContentElement.querySelector(`.films-list__show-more`);

  showMoreBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderedCount, renderedCount + COUNT_PER_STEP)
      .forEach((film) => render(siteFilmsListElement, createFilmCardTemplate(film), `beforeend`));

    renderedCount += COUNT_PER_STEP;

    if (renderedCount >= filmCards.length) {
      showMoreBtn.remove();
    }
  });
}

for (let i = 0; i < COUNT_TOP_FILMS; i++) {
  render(siteContentElement, createFilmsExtraTemplate(), `beforeend`);
}

const siteFilmsExtraListElements = document.querySelectorAll(`.films-list--extra .films-list__container`);

siteFilmsExtraListElements.forEach((element) => {
  for (let i = 0; i < COUNT_TOP_FILMS; i++) {
    render(element, createFilmCardTemplate(filmCards[i]), `beforeend`);
  }
});

render(siteMainElement, createFilmDetailsTemplate(filmCards[0], reactions), `beforeend`);
