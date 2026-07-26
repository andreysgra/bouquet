import AbstractView from '../framework/view/abstract-view';

const createCatalogueHeaderTemplate = () => `
  <div class="catalogue__header">
    <h2 class="title title--h3 catalogue__title">Каталог</h2>
  </div>
`;

export default class CatalogueHeaderView extends AbstractView {
  get template() {
    return createCatalogueHeaderTemplate();
  }
}
