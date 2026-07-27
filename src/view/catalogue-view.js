import AbstractView from '../framework/view/abstract-view';

const createCatalogueTemplate = () => `
  <div class="catalogue" data-items="catalogue"></div>
`;

export default class CatalogueView extends AbstractView {
  get template() {
    return createCatalogueTemplate();
  }
}

