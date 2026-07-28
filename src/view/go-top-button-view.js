import AbstractView from '../framework/view/abstract-view';

const createGoTopButtonTemplate = () => `
  <button class="btn-round btn-round--to-top btn-round--size-small catalogue__to-top-btn" type="button" aria-label="наверх">
    <svg width="80" height="85" aria-hidden="true" focusable="false">
      <use xlink:href="#icon-round-button"></use>
    </svg>
  </button>
`;

export default class GoTopButtonView extends AbstractView {
  constructor() {
    super();

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createGoTopButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();

    window.scrollTo({top: 0, behavior: 'smooth'});
  };
}
