import Abstract from "./abstract.js";

const createFilmsContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsContainer extends Abstract {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
