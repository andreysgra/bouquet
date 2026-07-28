import CatalogueView from '../view/catalogue-view';
import {remove, render, replace} from '../framework/render';
import CatalogueContainerView from '../view/catalogue-container-view';
import CatalogueHeaderView from '../view/catalogue-header-view';
import CatalogueSortView from '../view/catalogue-sort-view';
import CatalogueListView from '../view/catalogue-list-view';
import ProductPresenter from './product-presenter';
import {getFilterColor, getFilterReason} from '../utils/filter';
import CatalogueButtonsView from '../view/catalogue-buttons-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import GoTopButtonView from '../view/go-top-button-view';
import {PRODUCTS_COUNT_PER_STEP} from '../const';
import CatalogueListEmptyView from '../view/catalogue-list-empty-view';

export default class CataloguePresenter {
  #container = null;

  #productPresenters = new Map();

  #productsModel = null;
  #filterModel = null;

  #renderedProductsCount = PRODUCTS_COUNT_PER_STEP;

  #catalogueComponent = new CatalogueView();
  #catalogueContainerComponent = new CatalogueContainerView();
  #catalogueHeaderComponent = new CatalogueHeaderView();
  #catalogueSortComponent = null;
  #catalogueListComponent = new CatalogueListView();
  #catalogueButtonsComponent = new CatalogueButtonsView();
  #showMoreButtonComponent = null;
  #goTopButtonComponent = new GoTopButtonView();
  #catalogueListEmptyComponent = null;

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
    const products = this.products.slice(0, Math.min(this.products.length, this.#renderedProductsCount));

    this.#renderCatalogue();
    this.#renderCatalogueContainer();
    this.#renderCatalogueHeader();
    this.#renderCatalogueSort();
    this.#renderCatalogueList();

    if (products.length === 0) {
      this.#renderCatalogueListEmpty();

      return;
    }

    this.#renderCatalogueButtons();
    this.#renderProductCards(products);
  }

  #renderCatalogue() {
    render(this.#catalogueComponent, this.#container);
  }

  #renderCatalogueButtons() {
    render(this.#catalogueButtonsComponent, this.#catalogueContainerComponent.element);
    this.#renderShowMoreButton();
    this.#renderGoTopButton();
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

  #renderCatalogueListEmpty() {
    this.#catalogueListEmptyComponent = new CatalogueListEmptyView();
    replace(this.#catalogueListEmptyComponent, this.#catalogueListComponent);
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

  #renderGoTopButton() {
    render(this.#goTopButtonComponent, this.#catalogueButtonsComponent.element);
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

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#showMoreButtonClickHandler
    });

    render(this.#showMoreButtonComponent, this.#catalogueButtonsComponent.element);
  }

  #showMoreButtonClickHandler = () => {
    const productsCount = this.products.length;
    const newRenderedProductsCount = Math.min(productsCount, this.#renderedProductsCount + PRODUCTS_COUNT_PER_STEP);
    const products = this.products.slice(this.#renderedProductsCount, newRenderedProductsCount);

    this.#renderProductCards(products);

    this.#renderedProductsCount += PRODUCTS_COUNT_PER_STEP;

    if (this.#renderedProductsCount >= this.products.length) {
      remove(this.#showMoreButtonComponent);
    }
  };
}
