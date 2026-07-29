import AbstractView from '../framework/view/abstract-view';

const createCatalogueListEmptyTemplate = () => `
  <div class="message catalogue__no-items">
    <p class="text text--align-center message__text">Извините, но по вашему запросу букетов не найдено</p>
  </div>
`;

export default class CatalogueListEmptyView extends AbstractView {
  get template() {
    return createCatalogueListEmptyTemplate();
  }
}
