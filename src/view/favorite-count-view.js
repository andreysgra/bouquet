import AbstractView from '../framework/view/abstract-view';

const createFavoriteCountTemplate = (cart) => {
  const {productCount, sum} = cart;

  return `
    <div class="header-count">
      <button class="header-count__btn" type="button">
        <svg width="60" height="47" aria-hidden="true">
          <use xlink:href="#icon-heart-header"></use>
        </svg>
        <span class="visually-hidden">закрыть</span>
      </button>
      <div class="header-count__count">
        <p class="text text--size-20 header-count__counter">${productCount}</p>
      </div>
      <div class="header-count__block">
        <p class="text text--size-20 header-count__text">сумма</p>
        <b class="price price--size-min header-count__price">
          ${sum}<span>Р</span>
        </b>
      </div>
    </div>
  `;
};

export default class FavoriteCountView extends AbstractView {
  #cart = null;

  #handleButtonClick = () => null;

  constructor({cart, onButtonClick}) {
    super();

    this.#cart = cart;

    this.#handleButtonClick = onButtonClick;

    this.element.querySelector('.header-count__btn')
      .addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createFavoriteCountTemplate(this.#cart);
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    evt.currentTarget.setAttribute('disabled', '');

    this.#handleButtonClick();
  };
}
