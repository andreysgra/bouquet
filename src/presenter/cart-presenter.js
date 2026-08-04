import CartPopupView from '../view/cart-popup-view';
import {remove, render, RenderPosition} from '../framework/render';
import CartPopupWrapperView from '../view/cart-popup-wrapper-view';
import CartHeroView from '../view/cart-hero-view';

export default class CartPresenter {
  #container = null;

  #cartPopupComponent = new CartPopupView();
  #cartPopupWrapperComponent = new CartPopupWrapperView();
  #cartHeroComponent = null;

  #handleCloseButtonClick = () => null;

  constructor({container, onCloseButtonClick}) {
    this.#container = container;

    this.#handleCloseButtonClick = onCloseButtonClick;
  }

  destroy() {
    remove(this.#cartHeroComponent);
    remove(this.#cartPopupWrapperComponent);
    remove(this.#cartPopupComponent);

    this.#cartHeroComponent = null;
    this.#cartPopupWrapperComponent = null;
    this.#cartPopupComponent = null;
  }

  init() {
    this.#renderCartPopup();
    this.#renderCartPopupWrapper();
    this.#renderCartHero();
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

  #closeButtonClickHandler = () => {
    this.#handleCloseButtonClick();
  };
}
