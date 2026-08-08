import AbstractStatefulView from '../framework/view/abstract-stateful-view';

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

export default class CartTotalView extends AbstractStatefulView {
  constructor({cart}) {
    super();

    this._state = cart;
  }

  get template() {
    return createCartTotalTemplate(this._state);
  }

  _restoreHandlers() {}
}
