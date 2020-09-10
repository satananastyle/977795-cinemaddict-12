import Abstract from "./abstract.js";

const createShowMoreBtn = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreBtn extends Abstract {
  getTemplate() {
    return createShowMoreBtn();
  }
}
