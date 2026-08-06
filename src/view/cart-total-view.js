import AbstractView from '../framework/view/abstract-view';

const createCartTotalTemplate = (cart) => {
  const {productCount, sum} = cart;

  return `
    <div class="popup-deferred__sum">
      <p class="text text--total">Итого вы выбрали:</p>
      <div class="popup-deferred__block-wrap">
        <div class="popup-deferred__block">
          <p class="text text--total">Букеты</p>
          <span class="popup-deferred__count">${productCount}</span>
        </div>
        <div class="popup-deferred__block">
          <p class="text text--total">Сумма</p>
          <b class="price price--size-middle-p">
            ${sum}<span>Р</span>
          </b>
        </div>
      </div>
    </div>
  `;
};

export default class CartTotalView extends AbstractView {
  #cart = null;

  constructor({cart}) {
    super();

    this.#cart = cart;
  }

  get template() {
    return createCartTotalTemplate(this.#cart);
  }
}
