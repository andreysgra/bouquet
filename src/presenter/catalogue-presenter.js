import CatalogueView from '../view/catalogue-view';
import {remove, render, replace} from '../framework/render';
import CatalogueContainerView from '../view/catalogue-container-view';
import CatalogueHeaderView from '../view/catalogue-header-view';
import {CatalogueSortView} from '../view/catalogue-sort-view';
import CatalogueListView from '../view/catalogue-list-view';
import ProductPresenter from './product-presenter';
import {getFilterColor, getFilterReason} from '../utils/filter';
import CatalogueButtonsView from '../view/catalogue-buttons-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import GoTopButtonView from '../view/go-top-button-view';
import {PRODUCTS_COUNT_PER_STEP, SortType, TimeLimit, UpdateType, UserAction} from '../const';
import CatalogueListEmptyView from '../view/catalogue-list-empty-view';
import {sortByPriceDescending, sortByPriseAscending} from '../utils/product';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

export default class CataloguePresenter {
  #container = null;

  #productPresenters = new Map();

  #productsModel = null;
  #filterModel = null;
  #cartModel = null;

  #renderedProductsCount = PRODUCTS_COUNT_PER_STEP;
  #currentSortType = SortType.ASCENDING;
  #uiBlocker = new UiBlocker({lowerLimit: TimeLimit.LOWER, upperLimit: TimeLimit.UPPER});

  #catalogueComponent = new CatalogueView();
  #catalogueContainerComponent = new CatalogueContainerView();
  #catalogueHeaderComponent = new CatalogueHeaderView();
  #catalogueSortComponent = null;
  #catalogueListComponent = new CatalogueListView();
  #catalogueButtonsComponent = new CatalogueButtonsView();
  #showMoreButtonComponent = null;
  #goTopButtonComponent = new GoTopButtonView();
  #catalogueListEmptyComponent = null;

  #handleCardClick = () => null;

  constructor({container, productsModel, filterModel, cartModel, onCardClick}) {
    this.#container = container;

    this.#productsModel = productsModel;
    this.#filterModel = filterModel;
    this.#cartModel = cartModel;

    this.#filterModel.addObserver(this.#modelEventHandler);
    this.#cartModel.addObserver(this.#modelEventHandler);
    this.#productsModel.addObserver(this.#modelEventHandler);

    this.#handleCardClick = onCardClick;
  }

  get products() {
    const filterReason = this.#filterModel.filterReason;
    const filterColors = this.#filterModel.filterColors;

    const products = this.#productsModel.products;
    const filteredProducts = getFilterColor(getFilterReason(products, filterReason), filterColors);

    switch (this.#currentSortType) {
      case SortType.ASCENDING:
        return filteredProducts.sort(sortByPriseAscending);
      case SortType.DESCENDING:
        return filteredProducts.sort(sortByPriceDescending);
    }

    return filteredProducts;
  }

  destroy() {
    remove(this.#catalogueComponent);
    remove(this.#catalogueContainerComponent);
    remove(this.#catalogueHeaderComponent);
    remove(this.#catalogueSortComponent);
    remove(this.#catalogueListComponent);

    this.#catalogueSortComponent = null;

    this.#clearProductsBoard({
      resetRenderedProductsCount: true
    });
  }

  init() {
    this.#renderBoard();
  }

  #clearProductsBoard({resetRenderedProductsCount = false, resetSortType = false} = {}) {
    this.#productPresenters.forEach((presenter) => presenter.destroy());
    this.#productPresenters.clear();

    if (this.#catalogueListEmptyComponent) {
      remove(this.#catalogueListEmptyComponent);
    }

    remove(this.#showMoreButtonComponent);

    if (resetRenderedProductsCount) {
      this.#renderedProductsCount = PRODUCTS_COUNT_PER_STEP;
    } else {
      this.#renderedProductsCount = Math.min(this.products.length, this.#renderedProductsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.ASCENDING;
    }
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
    this.#renderProductsBoard(products);
  }

  #renderCatalogue() {
    render(this.#catalogueComponent, this.#container);
  }

  #renderCatalogueButtons() {
    render(this.#catalogueButtonsComponent, this.#catalogueContainerComponent.element);
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

    this.#catalogueSortComponent = new CatalogueSortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#sortTypeChangeHandler
    });

    if (currentCatalogueSortComponent === null) {
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
      container: this.#catalogueListComponent.element,
      cartModel: this.#cartModel,
      onCardClick: this.#handleCardClick,
      onDataChange: this.#viewActionHandler
    });

    productPresenter.init(product);
    this.#productPresenters.set(product.id, productPresenter);
  }

  #renderProductCards(products) {
    products.forEach((product) => this.#renderProductCard(product));
  }

  #renderProductsBoard(products) {
    this.#renderProductCards(products);

    if (this.products.length > this.#renderedProductsCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#showMoreButtonClickHandler
    });

    render(this.#showMoreButtonComponent, this.#catalogueButtonsComponent.element);
  }

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#productPresenters.has(data.id)) {
          this.#productPresenters.get(data.id).init(data);
        }
        break;
      case UpdateType.MINOR:
        this.#currentSortType = SortType.ASCENDING;
        break;
      case UpdateType.MAJOR:
        this.#clearProductsBoard({
          resetRenderedProductsCount: true,
          resetSortType: true
        });

        this.#renderBoard();
        break;
    }
  };

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

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    const products = this.products.slice(0, Math.min(this.products.length, PRODUCTS_COUNT_PER_STEP));

    this.#clearProductsBoard({resetRenderedProductsCount: true});
    this.#renderCatalogueSort();
    this.#renderProductsBoard(products);
  };

  #viewActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.ADD_CART:
        try {
          await this.#cartModel.add(updateType, update);
        } catch (err) {
          if (this.#productPresenters.has(update.id)) {
            this.#productPresenters.get(update.id).setAborting();
          }
        }
        break;
      case UserAction.DELETE_CART:
        try {
          await this.#cartModel.delete(updateType, update);
        } catch (err) {
          if (this.#productPresenters.has(update.id)) {
            this.#productPresenters.get(update.id).setAborting();
          }
        }
        break;
    }

    this.#uiBlocker.unblock();
  };
}
