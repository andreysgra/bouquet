import AbstractView from '../framework/view/abstract-view';

const createCartContainerTemplate = () => `
  <div class="popup-deferred__container"></div>
`;

export default class CartContainerView extends AbstractView {
  get template() {
    return createCartContainerTemplate();
  }
}
