import CatalogueView from '../view/catalogue-view';
import {remove, render, replace} from '../framework/render';
import CatalogueContainerView from '../view/catalogue-container-view';
import CatalogueHeaderView from '../view/catalogue-header-view';
import CatalogueSortView from '../view/catalogue-sort-view';
import CatalogueListView from '../view/catalogue-list-view';

export default class CataloguePresenter {
  #container = null;

  #catalogueComponent = new CatalogueView();
  #catalogueContainerComponent = new CatalogueContainerView();
  #catalogueHeaderComponent = new CatalogueHeaderView();
  #catalogueSortComponent = null;
  #catalogueListComponent = new CatalogueListView();

  constructor({container}) {
    this.#container = container;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#renderCatalogue();
    this.#renderCatalogueContainer();
    this.#renderCatalogueHeader();
    this.#renderCatalogueSort();
    this.#renderCatalogueList();
  }

  #renderCatalogue() {
    render(this.#catalogueComponent, this.#container);
  }

  #renderCatalogueContainer() {
    render(this.#catalogueContainerComponent, this.#catalogueComponent.element);
  }

  #renderCatalogueHeader() {
    render(this.#catalogueHeaderComponent, this.#catalogueContainerComponent.element);
  }

  #renderCatalogueList() {
    render(this.#catalogueListComponent, this.#catalogueContainerComponent.element);
  }

  #renderCatalogueSort() {
    const currentCatalogueSortComponent = this.#catalogueSortComponent;

    if (this.#catalogueSortComponent === null) {
      this.#catalogueSortComponent = new CatalogueSortView();
      render(this.#catalogueSortComponent, this.#catalogueHeaderComponent.element);
    } else {
      replace(this.#catalogueSortComponent, currentCatalogueSortComponent);
      remove(currentCatalogueSortComponent);
    }
  }
}
