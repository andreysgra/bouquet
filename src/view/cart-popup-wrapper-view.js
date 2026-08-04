import AbstractView from '../framework/view/abstract-view';

const createCartPopupWrapperTemplate = () => `
  <div class="popup-deferred__wrapper"></div>
`;

export default class CartPopupWrapperView extends AbstractView {
  get template() {
    return createCartPopupWrapperTemplate();
  }
}
