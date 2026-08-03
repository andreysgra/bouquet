import ProductCardView from '../view/product-card-view';
import {remove, render, replace} from '../framework/render';
import {UpdateType, UserAction} from '../const';

export default class ProductPresenter {
  #container = null;

  #cartModel = null;

  #product = null;

  #productCardComponent = null;

  #handleCardClick = () => null;
  #handleDataChange = () => null;

  constructor({container, cartModel, onCardClick, onDataChange}) {
    this.#container = container;
    this.#cartModel = cartModel;
    this.#handleCardClick = onCardClick;
    this.#handleDataChange = onDataChange;
  }

  destroy() {
    remove(this.#productCardComponent);
  }

  init(product) {
    this.#product = product;

    const isFavorite = this.#cartModel.products.has(product.id);
    const currentProductCardComponent = this.#productCardComponent;

    this.#productCardComponent = new ProductCardView({
      product: this.#product,
      isFavorite,
      onCardClick: this.#cardClickHandler,
      onFavoriteButtonClick: this.#favoriteButtonClickHandler
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

  #favoriteButtonClickHandler = () => {
    this.#handleDataChange(
      UserAction.ADD_CART,
      UpdateType.PATCH,
      this.#product
    );
  };
}
