import ProductCardView from '../view/product-card-view';
import {remove, render, replace} from '../framework/render';

export default class ProductPresenter {
  #container = null;

  #product = null;

  #productCardComponent = null;

  constructor({container}) {
    this.#container = container;
  }

  destroy() {
    remove(this.#productCardComponent);
  }

  init(product) {
    this.#product = product;

    const currentProductCardComponent = this.#productCardComponent;

    this.#productCardComponent = new ProductCardView({
      product: this.#product
    });

    if (currentProductCardComponent === null) {
      render(this.#productCardComponent, this.#container);
    } else {
      replace(this.#productCardComponent, currentProductCardComponent);
      remove(currentProductCardComponent);
    }
  }
}
