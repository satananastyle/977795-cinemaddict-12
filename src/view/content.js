import Abstract from "./abstract.js";

const createContentTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class Content extends Abstract {
  getTemplate() {
    return createContentTemplate();
  }
}
