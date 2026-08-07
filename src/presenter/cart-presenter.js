import CartPopupView from '../view/cart-popup-view';
import {remove, render, RenderPosition} from '../framework/render';
import CartPopupWrapperView from '../view/cart-popup-wrapper-view';
import CartHeroView from '../view/cart-hero-view';
import CartContainerView from '../view/cart-container-view';
import CartCatalogueButtonView from '../view/cart-catalogue-button-view';
import CartCatalogueView from '../view/cart-catalogue-view';
import ProductDeferredPresenter from './product-deferred-presenter';
import CartClearButtonView from '../view/cart-clear-button-view';
import CartTotalView from '../view/cart-total-view';
import {UpdateType, UserAction} from '../const';

export default class CartPresenter {
  #container = null;

  #productDeferredPresenters = new Map();

  #productsModel = null;
  #cartModel = null;

  #cartPopupComponent = new CartPopupView();
  #cartPopupWrapperComponent = new CartPopupWrapperView();
  #cartHeroComponent = null;
  #cartContainerComponent = new CartContainerView();
  #cartCatalogueButtonComponent = null;
  #cartCatalogueComponent = new CartCatalogueView();
  #cartClearButtonComponent = null;
  #cartTotalViewComponent = null;

  #handleCloseButtonClick = () => null;
  #handleCatalogueButtonClick = () => null;

  constructor({container, productsModel, cartModel, onCloseButtonClick, onCatalogueButtonClick}) {
    this.#container = container;

    this.#productsModel = productsModel;
    this.#cartModel = cartModel;

    this.#cartModel.addObserver(this.#modelEventHandler);

    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleCatalogueButtonClick = onCatalogueButtonClick;
  }

  get products() {
    return this.#productsModel.products.filter((product) => this.#cartModel.products.has(product.id));
  }

  destroy() {
    remove(this.#cartHeroComponent);
    remove(this.#cartContainerComponent);
    remove(this.#cartCatalogueButtonComponent);
    remove(this.#cartClearButtonComponent);
    remove(this.#cartTotalViewComponent);
    remove(this.#cartCatalogueComponent);
    remove(this.#cartPopupWrapperComponent);
    remove(this.#cartPopupComponent);

    this.#clearProductsDeferredBoard();

    this.#cartHeroComponent = null;
    this.#cartCatalogueButtonComponent = null;
    this.#cartClearButtonComponent = null;
    this.#cartTotalViewComponent = null;
    this.#cartCatalogueComponent = null;
    this.#cartContainerComponent = null;
    this.#cartPopupWrapperComponent = null;
    this.#cartPopupComponent = null;

    this.#cartModel.removeObserver(this.#modelEventHandler);
  }

  init() {
    this.#renderBoard();
  }

  #clearProductsDeferredBoard() {
    this.#productDeferredPresenters.forEach((presenter) => presenter.destroy());
    this.#productDeferredPresenters.clear();
  }

  #renderBoard() {

    this.#renderCartPopup();
    this.#renderCartPopupWrapper();
    this.#renderCartHero();
    this.#renderCartContainer();
    this.#renderCartCatalogueButton();
    this.#renderCartCatalogue();
    this.#renderProductsDeferredBoard();
    this.#renderCartClearButton();
    this.#renderCartTotal();
  }

  #renderCartCatalogueButton() {
    this.#cartCatalogueButtonComponent = new CartCatalogueButtonView({
      onClick: this.#catalogueButtonClickHandler
    });

    render(this.#cartCatalogueButtonComponent, this.#cartContainerComponent.element);
  }

  #renderCartContainer() {
    render(this.#cartContainerComponent, this.#cartPopupWrapperComponent.element);
  }

  #renderCartCatalogue() {
    render(this.#cartCatalogueComponent, this.#cartContainerComponent.element);
  }

  #renderCartClearButton() {
    if (this.#cartClearButtonComponent === null) {
      this.#cartClearButtonComponent = new CartClearButtonView({
        onClick: this.#cartClearButtonClickHandler
      });
    }

    if (this.#cartModel.cart.productCount > 0) {
      render(this.#cartClearButtonComponent, this.#cartCatalogueComponent.element, RenderPosition.AFTEREND);
    } else {
      remove(this.#cartClearButtonComponent);
    }
  }

  #renderCartHero() {
    this.#cartHeroComponent = new CartHeroView({
      onCloseButtonClick: this.#closeButtonClickHandler
    });

    render(this.#cartHeroComponent, this.#cartPopupWrapperComponent.element);
  }

  #renderCartPopup() {
    render(this.#cartPopupComponent, this.#container, RenderPosition.AFTEREND);
  }

  #renderCartPopupWrapper() {
    render(this.#cartPopupWrapperComponent, this.#cartPopupComponent.element);
  }

  #renderProductDeferredCard(product) {
    const productDeferredPresenter = new ProductDeferredPresenter({
      container: this.#cartCatalogueComponent.element,
      cartModel: this.#cartModel,
      onDataChange: this.#viewActionHandler
    });

    productDeferredPresenter.init(product);
    this.#productDeferredPresenters.set(product.id, productDeferredPresenter);
  }

  #renderCartTotal() {
    if (this.#cartTotalViewComponent === null) {
      this.#cartTotalViewComponent = new CartTotalView({
        cart: this.#cartModel.cart
      });

      render(this.#cartTotalViewComponent, this.#cartContainerComponent.element);
    } else {
      this.#cartTotalViewComponent.updateElement(this.#cartModel.cart);
    }
  }

  #renderProductDeferredCards(products) {
    products.forEach((product) => this.#renderProductDeferredCard(product));
  }

  #renderProductsDeferredBoard() {
    this.#renderProductDeferredCards(this.products);
  }

  #cartClearButtonClickHandler = () => {
  };

  #catalogueButtonClickHandler = () => {
    this.#handleCatalogueButtonClick();
  };

  #closeButtonClickHandler = () => {
    this.#handleCloseButtonClick();
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#productDeferredPresenters.has(data.id)) {
          this.#productDeferredPresenters.get(data.id).init(data);
        }

        this.#renderCartTotal();
        break;
      case UpdateType.MINOR:
        this.#clearProductsDeferredBoard();
        this.#renderProductsDeferredBoard();
        this.#renderCartClearButton();
        this.#renderCartTotal();
        break;
    }
  };

  #viewActionHandler = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD_CART:
        try {
          await this.#cartModel.add(updateType, update);
        } catch (err) {
          if (this.#productDeferredPresenters.has(update.id)) {
            this.#productDeferredPresenters.get(update.id).setAborting();
          }
        }
        break;
      case UserAction.DELETE_CART:
        try {
          await this.#cartModel.delete(updateType, update);
        } catch (err) {
          if (this.#productDeferredPresenters.has(update.id)) {
            this.#productDeferredPresenters.get(update.id).setAborting();
          }
        }
        break;
      case UserAction.DELETE_PRODUCT:
        try {
          await this.#cartModel.deleteProduct(updateType, update);
        } catch (err) {
          if (this.#productDeferredPresenters.has(update.id)) {
            this.#productDeferredPresenters.get(update.id).setAborting();
          }
        }
        break;
    }
  };
}
