import FavoriteCountView from '../view/favorite-count-view';
import {remove, render, replace} from '../framework/render';

export default class FavoriteCountPresenter {
  #container = null;

  #cartModel = null;

  #favoriteCountComponent = null;

  #handleButtonClick = () => null;

  constructor({container, cartModel, onButtonClick}) {
    this.#container = container;
    this.#cartModel = cartModel;

    this.#cartModel.addObserver(this.#modelEventHandler);

    this.#handleButtonClick = onButtonClick;
  }

  init() {
    const cart = this.#cartModel.cart;
    const currentFavoriteCountComponent = this.#favoriteCountComponent;

    this.#favoriteCountComponent = new FavoriteCountView({
      cart,
      onButtonClick: this.#handleButtonClick
    });

    if (currentFavoriteCountComponent === null) {
      render(this.#favoriteCountComponent, this.#container);
    } else {
      replace(this.#favoriteCountComponent, currentFavoriteCountComponent);
      remove(currentFavoriteCountComponent);
    }
  }

  #modelEventHandler = () => {
    this.init();
  };
}
