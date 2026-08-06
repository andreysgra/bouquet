import ProductDeferredCardView from '../view/product-deferred-card-view';
import {remove, render, replace} from '../framework/render';

export default class ProductDeferredPresenter {
  #container = null;

  #cartModel = null;

  #product = null;

  #productDeferredCardComponent = null;

  constructor({container, cartModel}) {
    this.#container = container;

    this.#cartModel = cartModel;
  }

  destroy() {
    remove(this.#productDeferredCardComponent);
  }

  init(product) {
    this.#product = product;

    const productCount = this.#cartModel.products.get(product.id);
    const currentProductDeferredCardComponent = this.#productDeferredCardComponent;

    this.#productDeferredCardComponent = new ProductDeferredCardView({
      product: this.#product,
      productCount
    });

    if (currentProductDeferredCardComponent === null) {
      render(this.#productDeferredCardComponent, this.#container);
    } else {
      replace(this.#productDeferredCardComponent, currentProductDeferredCardComponent);
      remove(currentProductDeferredCardComponent);
    }
  }
}
