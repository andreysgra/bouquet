import AbstractView from '../framework/view/abstract-view';

const createCartCatalogueButtonTemplate = () => `
  <a class="btn btn--with-icon popup-deferred__btn btn--light" href="#">в&nbsp;каталог
    <svg width="61" height="24" aria-hidden="true">
      <use xlink:href="#icon-arrow"></use>
    </svg>
  </a>
`;

export default class CartCatalogueButtonView extends AbstractView {
  #handleClick = () => null;

  constructor({onClick}) {
    super();

    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createCartCatalogueButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    document.querySelector('.header-count__btn').removeAttribute('disabled');

    this.#handleClick();
  };
}
