import AbstractView from '../framework/view/abstract-view';
import {getFormattedNumber} from '../utils/common';

const createProductDeferredCardComponent = (product, productCount) => {
  const {title, description, price, previewImage} = product;

  return `
    <li class="popup-deferred__item">
      <div class="deferred-card">
        <div class="deferred-card__img">
          <picture>
            <source type="image/webp" srcset="${previewImage}, ${previewImage} 2x">
            <img src="img/content/defer1.jpg" srcset="img/content/defer1@2x.jpg 2x" width="233" height="393" alt="${title}">
          </picture>
        </div>
        <div class="deferred-card__content">
          <h2 class="title title--h2">${title}</h2>
          <p class="text text--size-40">${description}</p>
        </div>
        <div class="deferred-card__count">
          <button class="btn-calculate" id="btn-decrease" type="button">
            <svg width="30" height="27" aria-hidden="true">
              <use xlink:href="#icon-minus"></use>
            </svg>
          </button>
          <span>${productCount}</span>
          <button class="btn-calculate" id="btn-increase" type="button">
            <svg width="30" height="28" aria-hidden="true">
              <use xlink:href="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div class="deferred-card__price">
          <b class="price price--size-middle-p">${getFormattedNumber(price * productCount)}<span>Р</span></b>
        </div>
        <button class="btn-close deferred-card__close-btn" type="button">
          <svg width="55" height="56" aria-hidden="true">
            <use xlink:href="#icon-close-big"></use>
          </svg>
        </button>
        <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
          <use xlink:href="#icon-loader"></use>
        </svg>
      </div>
    </li>
  `;
};

export default class ProductDeferredCardView extends AbstractView {
  #product = null;
  #productCount = 0;

  #handleButtonDecreaseClick = () => null;
  #handleButtonIncreaseClick = () => null;
  #handleButtonDeleteClick = () => null;

  constructor({product, productCount, onButtonDecreaseClick, onButtonIncreaseClick, onButtonDeleteClick}) {
    super();

    this.#product = product;
    this.#productCount = productCount;

    this.#handleButtonDecreaseClick = onButtonDecreaseClick;
    this.#handleButtonIncreaseClick = onButtonIncreaseClick;
    this.#handleButtonDeleteClick = onButtonDeleteClick;

    this.element.querySelector('#btn-decrease').addEventListener('click', this.#buttonDecreaseClickHandler);
    this.element.querySelector('#btn-increase').addEventListener('click', this.#buttonIncreaseClickHandler);
    this.element.querySelector('.btn-close').addEventListener('click', this.#buttonDeleteClickHandler);
  }

  get template() {
    return createProductDeferredCardComponent(this.#product, this.#productCount);
  }

  shakeControl() {
    this.shake.call({element: this.element.querySelector('.deferred-card__count')});
  }

  #buttonDecreaseClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleButtonDecreaseClick();
  };

  #buttonDeleteClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleButtonDeleteClick();
  };

  #buttonIncreaseClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleButtonIncreaseClick();
  };
}
