import CatalogueView from '../view/catalogue-view';
import {remove, render, replace} from '../framework/render';
import CatalogueContainerView from '../view/catalogue-container-view';
import CatalogueHeaderView from '../view/catalogue-header-view';
import CatalogueSortView from '../view/catalogue-sort-view';
import CatalogueListView from '../view/catalogue-list-view';
import ProductPresenter from './product-presenter';
import {getFilterColor, getFilterReason} from '../utils/filter';

export default class CataloguePresenter {
  #container = null;

  #productPresenters = new Map();

  #productsModel = null;
  #filterModel = null;

  #catalogueComponent = new CatalogueView();
  #catalogueContainerComponent = new CatalogueContainerView();
  #catalogueHeaderComponent = new CatalogueHeaderView();
  #catalogueSortComponent = null;
  #catalogueListComponent = new CatalogueListView();

  constructor({container, productsModel, filterModel}) {
    this.#container = container;

    this.#productsModel = productsModel;
    this.#filterModel = filterModel;
  }

  get products() {
    const filterReason = this.#filterModel.filterReason;
    const filterColors = this.#filterModel.filterColors;

    const products = this.#productsModel.products;

    return getFilterColor(getFilterReason(products, filterReason), filterColors);
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
    this.#renderProductCards(this.products);
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

  #renderProductCard(product) {
    const productPresenter = new ProductPresenter({
      container: this.#catalogueListComponent.element
    });

    productPresenter.init(product);
    this.#productPresenters.set(product.id, productPresenter);
  }

  #renderProductCards(products) {
    products.forEach((product) => this.#renderProductCard(product));
  }
}
