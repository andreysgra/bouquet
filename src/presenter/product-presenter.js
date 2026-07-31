import ProductCardView from '../view/product-card-view';
import {remove, render, replace} from '../framework/render';

export default class ProductPresenter {
  #container = null;

  #product = null;

  #productCardComponent = null;

  #handleCardClick = () => null;

  constructor({container, onCardClick}) {
    this.#container = container;
    this.#handleCardClick = onCardClick;
  }

  destroy() {
    remove(this.#productCardComponent);
  }

  init(product) {
    this.#product = product;

    const currentProductCardComponent = this.#productCardComponent;

    this.#productCardComponent = new ProductCardView({
      product: this.#product,
      onCardClick: this.#cardClickHandler
    });

    if (currentProductCardComponent === null) {
      render(this.#productCardComponent, this.#container);
    } else {
      replace(this.#productCardComponent, currentProductCardComponent);
      remove(currentProductCardComponent);
    }
  }

  #cardClickHandler = () => {
    this.#handleCardClick(this.#product);
  };
}
