import AbstractView from '../framework/view/abstract-view';
import {getFormattedNumber} from '../utils/common';

const createDescriptionTemplate = (product, isFavorite) => {
  const {title, price, description} = product;
  return `
    <div class="product-description">
      <div class="product-description__header">
        <h3 class="title title--h2">${title}</h3>
        <b class="price price--size-big">${getFormattedNumber(price)}<span>Р</span></b>
      </div>
      <p class="text text--size-40">${description}</p>
      <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus>
        ${isFavorite ? 'отложено' : 'отложить'}
      </button>
    </div>
  `;
};

export default class ProductModalDescriptionView extends AbstractView {
  #product = null;
  #isFavorite = false;

  #handleFavoriteButtonClick = () => null;

  constructor({product, isFavorite, onFavoriteButtonClick}) {
    super();

    this.#product = product;
    this.#isFavorite = isFavorite;

    this.#favoriteButtonClickHandler = onFavoriteButtonClick;

    this.element.querySelector('.product-description__button')
      .addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template() {
    return createDescriptionTemplate(this.#product, this.#isFavorite);
  }

  shakeControl() {
    this.shake.call({element: this.element});
  }

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleFavoriteButtonClick();
  };
}
