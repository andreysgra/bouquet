import AbstractView from '../framework/view/abstract-view';

const createCatalogueButtonsTemplate = () => `
  <div class="catalogue__btn-wrap"></div>
`;

export default class CatalogueButtonsView extends AbstractView {
  get template() {
    return createCatalogueButtonsTemplate();
  }
}
