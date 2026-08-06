import AbstractView from '../framework/view/abstract-view';

const createCartCatalogueTemplate = () => `
  <ul class="popup-deferred__catalog"></ul>
`;

export default class CartCatalogueView extends AbstractView {
  get template() {
    return createCartCatalogueTemplate();
  }
}
