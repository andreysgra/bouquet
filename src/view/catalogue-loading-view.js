import AbstractView from '../framework/view/abstract-view';

const createCatalogueLoadingTemplate = () => `
  <section class="catalogue">
    <div class="container">
      <h2 class="title title--h3">Загрузка каталога...</h2>
    </div>
  </section>
`;

export default class CatalogueLoadingView extends AbstractView {
  get template() {
    return createCatalogueLoadingTemplate();
  }
}
