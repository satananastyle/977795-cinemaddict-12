import Smart from "./smart.js";

const renderGenres = (genres) => {
  let listGenres = ``;

  for (let i = 0; i < genres.length; i++) {
    listGenres += `<span class="film-details__genre">${genres[i]}</span>`;
  }

  return listGenres;
};

const renderGenreContainer = (genres) => {
  const genreFlag = genres.length > 1 ? `Genres` : `Genre`;
  return (
    `<td class="film-details__term">${genreFlag}</td>
     <td class="film-details__cell">
       ${renderGenres(genres)}
    </td>`
  );
};

const renderComments = (comments, reactions) => {
  let listReactions = ``;

  for (let i = 0; i < comments; i++) {
    listReactions += `
      <li class="film-details__comment">
         <span class="film-details__comment-emoji">
           <img src="./images/emoji/${reactions[i].emoji}" width="55" height="55" alt="emoji-smile">
         </span>
         <div>
           <p class="film-details__comment-text">${reactions[i].message}</p>
           <p class="film-details__comment-info">
             <span class="film-details__comment-author">${reactions[i].author}</span>
             <span class="film-details__comment-day">${reactions[i].date.toLocaleString(`ko-KR`, {day: `numeric`, month: `numeric`, year: `numeric`})}</span>
             <button class="film-details__comment-delete">Delete</button>
           </p>
         </div>
       </li>
    `;
  }

  return listReactions;
};

const getControlsItemClass = (isActive) => {
  const classActiveButton = isActive
    ? `checked`
    : ``;

  return classActiveButton;
};

const renderFilmCardControls = (isWatchlist, isWatched, isFavorite) => {
  return (
    `<section class="film-details__controls">
       <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${getControlsItemClass(isWatchlist)}>
       <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

       <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${getControlsItemClass(isWatched)}>
       <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${getControlsItemClass(isFavorite)}>
       <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
     </section>`
  );
};

const createFilmDetailsTemplate = (filmCard) => {
  const {title, poster, comments, description, release, rating, genres, runtime, country, director, writers, actors, age, isWatchlist, isWatched, isFavorite, reactions} = filmCard;

  return (
    `<section class="film-details">
       <form class="film-details__inner" action="" method="get">
         <div class="form-details__top-container">
           <div class="film-details__close">
             <button class="film-details__close-btn" type="button">close</button>
           </div>
           <div class="film-details__info-wrap">
             <div class="film-details__poster">
               <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

               <p class="film-details__age">${age}+</p>
             </div>

             <div class="film-details__info">
               <div class="film-details__info-head">
                 <div class="film-details__title-wrap">
                   <h3 class="film-details__title">${title}</h3>
                   <p class="film-details__title-original">Original: ${title}</p>
                 </div>

                 <div class="film-details__rating">
                   <p class="film-details__total-rating">${rating}</p>
                 </div>
               </div>

               <table class="film-details__table">
                 <tr class="film-details__row">
                   <td class="film-details__term">Director</td>
                   <td class="film-details__cell">${director}</td>
                 </tr>
                 <tr class="film-details__row">
                   <td class="film-details__term">Writers</td>
                   <td class="film-details__cell">${writers.join(`, `)}</td>
                 </tr>
                 <tr class="film-details__row">
                   <td class="film-details__term">Actors</td>
                   <td class="film-details__cell">${actors.join(`, `)}</td>
                 </tr>
                 <tr class="film-details__row">
                   <td class="film-details__term">Release Date</td>
                   <td class="film-details__cell">${release.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`})}</td>
                 </tr>
                 <tr class="film-details__row">
                   <td class="film-details__term">Runtime</td>
                   <td class="film-details__cell">${runtime.hours}h ${runtime.min}m</td>
                 </tr>
                 <tr class="film-details__row">
                   <td class="film-details__term">Country</td>
                   <td class="film-details__cell">${country}</td>
                 </tr>
                 <tr class="film-details__row">
                   ${renderGenreContainer(genres)}
                 </tr>
               </table>

               <p class="film-details__film-description">
                 ${description}
               </p>
             </div>
           </div>
           ${renderFilmCardControls(isWatchlist, isWatched, isFavorite)}
         </div>

         <div class="form-details__bottom-container">
           <section class="film-details__comments-wrap">
             <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments}</span></h3>

             <ul class="film-details__comments-list">
               ${renderComments(comments, reactions)}
             </ul>

             <div class="film-details__new-comment">
               <div for="add-emoji" class="film-details__add-emoji-label"></div>

               <label class="film-details__comment-label">
                 <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
               </label>

               <div class="film-details__emoji-list">
                 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                 <label class="film-details__emoji-label" for="emoji-smile">
                   <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                 </label>

                 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                 <label class="film-details__emoji-label" for="emoji-sleeping">
                   <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                 </label>

                 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                 <label class="film-details__emoji-label" for="emoji-puke">
                   <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                 </label>

                 <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                 <label class="film-details__emoji-label" for="emoji-angry">
                   <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                 </label>
               </div>
             </div>
           </section>
         </div>
       </form>
     </section>
    `
  );
};

export default class FilmDetails extends Smart {
  constructor(data) {
    super();
    this._data = data;
    this._clickHandler = this._clickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    this._callback.emojiClick();

    const emojiItems = document.querySelectorAll(`.film-details__emoji-item`);

    emojiItems.forEach((emojiItem) => {
      if (evt.target.value !== emojiItem.value) {
        emojiItem.removeAttribute(`checked`);
      } else {
        emojiItem.setAttribute(`checked`, ``);
      }
    });

    const addEmojiLabel = document.querySelector(`.film-details__add-emoji-label`);
    const addEmojiImage = `<img src="./images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-${evt.target.value}"></img>`;
    addEmojiLabel.innerHTML = addEmojiImage;
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`change`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, this._favoriteClickHandler);
  }

  setEmojiClickHandler(callback) {
    this._callback.emojiClick = callback;
    const emojis = this.getElement().querySelectorAll(`.film-details__emoji-item`);

    emojis.forEach((emoji) => {
      emoji.addEventListener(`click`, this._emojiClickHandler);
    });
  }

  restoreHandlers() {
    this.setEmojiClickHandler(this._callback.emojiClick);
    this.setClickHandler(this._callback.click);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
  }
}
