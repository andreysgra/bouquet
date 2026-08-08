import ProductDeferredCardView from '../view/product-deferred-card-view';
import {remove, render, replace} from '../framework/render';
import {UpdateType, UserAction} from '../const';

export default class ProductDeferredPresenter {
  #container = null;

  #cartModel = null;

  #product = null;

  #productDeferredCardComponent = null;

  #handleDataChange = () => null;

  constructor({container, cartModel, onDataChange}) {
    this.#container = container;

    this.#cartModel = cartModel;
    this.#handleDataChange = onDataChange;
  }

  destroy() {
    remove(this.#productDeferredCardComponent);
    this.#productDeferredCardComponent = null;
  }

  init(product) {
    this.#product = product;

    const productCount = this.#cartModel.products.get(this.#product.id);
    const currentProductDeferredCardComponent = this.#productDeferredCardComponent;

    this.#productDeferredCardComponent = new ProductDeferredCardView({
      product: this.#product,
      productCount,
      onButtonDecreaseClick: this.#buttonDecreaseClickHandler,
      onButtonIncreaseClick: this.#buttonIncreaseClickHandler,
      onButtonDeleteClick: this.#buttonDeleteClickHandler
    });

    if (currentProductDeferredCardComponent === null) {
      render(this.#productDeferredCardComponent, this.#container);
    } else {
      replace(this.#productDeferredCardComponent, currentProductDeferredCardComponent);
      remove(currentProductDeferredCardComponent);
    }
  }

  setAborting() {
    this.#productDeferredCardComponent.shake();
  }

  #buttonDecreaseClickHandler = () => {
    const productCount = this.#cartModel.products.get(this.#product.id);
    const updateType = (productCount > 1) ? UpdateType.PATCH : UpdateType.MINOR;

    this.#handleDataChange(
      UserAction.DELETE_CART,
      updateType,
      this.#product
    );
  };

  #buttonDeleteClickHandler = () => {
    this.#handleDataChange(
      UserAction.DELETE_PRODUCT,
      UpdateType.MINOR,
      this.#product
    );
  };

  #buttonIncreaseClickHandler = () => {
    this.#handleDataChange(
      UserAction.ADD_CART,
      UpdateType.PATCH,
      this.#product
    );
  };
}
