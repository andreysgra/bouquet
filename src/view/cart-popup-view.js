import AbstractView from '../framework/view/abstract-view';

const createCartPopupTemplate = () => `
  <section class="popup-deferred"></section>
`;

export default class CartPopupView extends AbstractView {
  get template() {
    return createCartPopupTemplate();
  }
}
