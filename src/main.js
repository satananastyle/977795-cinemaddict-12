import Header from "./view/header.js";
import Filter from "./view/navigation.js";
import Sort from "./view/sort.js";
import FilmsList from "./view/films-list.js";
import FilmCard from "./view/film-card.js";
import ShowMoreBtn from "./view/show-more.js";
import FilmsExtra from "./view/films-extra.js";
import FilmDetails from "./view/film-details.js";
import {generateFilmCard} from "./mock/film-card.js";
import {generateFilter} from "./mock/filters.js";
import {render, RenderPosition, remove} from "./utils/render.js";

const COUNT_ALL_FILMS = 22;
const COUNT_TOP_FILMS = 2;
const COUNT_PER_STEP = 5;

const filmCards = new Array(COUNT_ALL_FILMS).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);

const renderFilm = (filmsList, film) => {
  const filmCard = new FilmCard(film);
  const filmDetails = new FilmDetails(film);

  const showDetails = () => {
    render(filmsList, filmDetails, RenderPosition.BEFOREEND);
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

  render(filmsList, filmCard, RenderPosition.BEFOREEND);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const siteContent = new FilmsList();

render(siteHeaderElement, new Header(), RenderPosition.BEFOREEND);
render(siteMainElement, new Filter(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
render(siteMainElement, siteContent, RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(filmCards.length, COUNT_PER_STEP); i++) {
  renderFilm(siteContent.getElement().querySelector(`.films-list .films-list__container`), filmCards[i]);
}

if (filmCards.length > COUNT_PER_STEP) {
  let renderedCount = COUNT_PER_STEP;

  const showMoreBtnComponent = new ShowMoreBtn();

  render(siteContent.getElement().querySelector(`.films-list .films-list__container`), showMoreBtnComponent, RenderPosition.AFTEREND);

  showMoreBtnComponent.setClickHandler(() => {
    filmCards
      .slice(renderedCount, renderedCount + COUNT_PER_STEP)
      .forEach((film) => renderFilm(siteContent.getElement().querySelector(`.films-list .films-list__container`), film));

    renderedCount += COUNT_PER_STEP;

    if (renderedCount >= filmCards.length) {
      remove(showMoreBtnComponent);
    }
  });
}

for (let i = 0; i < COUNT_TOP_FILMS; i++) {
  render(siteContent.getElement(), new FilmsExtra().getElement(), RenderPosition.BEFOREEND);
}

const siteFilmsExtraListElements = document.querySelectorAll(`.films-list--extra .films-list__container`);

siteFilmsExtraListElements.forEach((element) => {
  for (let i = 0; i < COUNT_TOP_FILMS; i++) {
    renderFilm(element, filmCards[i]);
  }
});
