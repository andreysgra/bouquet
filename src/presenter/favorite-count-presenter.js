import FavoriteCountView from '../view/favorite-count-view';
import {remove, render, replace} from '../framework/render';

export default class FavoriteCountPresenter {
  #container = null;

  #cartModel = null;

  #favoriteCountComponent = null;

  constructor({container, cartModel}) {
    this.#container = container;
    this.#cartModel = cartModel;

    this.#cartModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const cart = this.#cartModel.cart;
    const currentFavoriteCountComponent = this.#favoriteCountComponent;

    this.#favoriteCountComponent = new FavoriteCountView({
      cart,
      onButtonClick: this.#buttonClickHandler
    });

    if (currentFavoriteCountComponent === null) {
      render(this.#favoriteCountComponent, this.#container);
    } else {
      replace(this.#favoriteCountComponent, currentFavoriteCountComponent);
      remove(currentFavoriteCountComponent);
    }
  }

  #buttonClickHandler = () => {
  };

  #modelEventHandler = () => {
    this.init();
  };
}
