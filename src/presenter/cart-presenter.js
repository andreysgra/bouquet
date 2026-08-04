import CartPopupView from '../view/cart-popup-view';
import {remove, render, RenderPosition} from '../framework/render';

export default class CartPresenter {
  #container = null;

  #cartPopupComponent = new CartPopupView();

  constructor({container}) {
    this.#container = container;
  }

  destroy() {
    remove(this.#cartPopupComponent);
    this.#cartPopupComponent = null;
  }

  init() {
    this.#renderCartPopup();
  }

  #renderCartPopup() {
    render(this.#cartPopupComponent, this.#container, RenderPosition.AFTEREND);
  }
}
