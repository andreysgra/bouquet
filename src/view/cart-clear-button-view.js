import AbstractView from '../framework/view/abstract-view';

const createCartClearButtonTemplate = () => `
  <div class="popup-deferred__btn-container">
    <button class="btn btn--with-icon popup-deferred__btn-clean" type="button">очистить
      <svg width="61" height="24" aria-hidden="true">
        <use xlink:href="#icon-arrow"></use>
      </svg>
    </button>
  </div>
`;

export default class CartClearButtonView extends AbstractView {
  #handleClick = () => null;

  constructor({onClick}) {
    super();

    this.#handleClick = onClick;
    this.element.querySelector('.popup-deferred__btn-clean').addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createCartClearButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();

    this.#handleClick();
  };
}
