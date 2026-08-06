import CartPopupView from '../view/cart-popup-view';
import {remove, render, RenderPosition} from '../framework/render';
import CartPopupWrapperView from '../view/cart-popup-wrapper-view';
import CartHeroView from '../view/cart-hero-view';
import CartContainerView from '../view/cart-container-view';
import CartCatalogueButtonView from '../view/cart-catalogue-button-view';
import CartCatalogueView from '../view/cart-catalogue-view';

export default class CartPresenter {
  #container = null;

  #cartPopupComponent = new CartPopupView();
  #cartPopupWrapperComponent = new CartPopupWrapperView();
  #cartHeroComponent = null;
  #cartContainerComponent = new CartContainerView();
  #cartCatalogueButtonComponent = null;
  #cartCatalogueComponent = new CartCatalogueView();

  #handleCloseButtonClick = () => null;
  #handleCatalogueButtonClick = () => null;

  constructor({container, onCloseButtonClick, onCatalogueButtonClick}) {
    this.#container = container;

    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleCatalogueButtonClick = onCatalogueButtonClick;
  }

  destroy() {
    remove(this.#cartHeroComponent);
    remove(this.#cartContainerComponent);
    remove(this.#cartCatalogueButtonComponent);
    remove(this.#cartCatalogueComponent);
    remove(this.#cartPopupWrapperComponent);
    remove(this.#cartPopupComponent);

    this.#cartHeroComponent = null;
    this.#cartCatalogueButtonComponent = null;
    this.#cartCatalogueComponent = null;
    this.#cartContainerComponent = null;
    this.#cartPopupWrapperComponent = null;
    this.#cartPopupComponent = null;
  }

  init() {
    this.#renderCartPopup();
    this.#renderCartPopupWrapper();
    this.#renderCartHero();
    this.#renderCartContainer();
    this.#renderCartCatalogueButton();
    this.#renderCartCatalogue();
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

  #catalogueButtonClickHandler = () => {
    this.#handleCatalogueButtonClick();
  };

  #closeButtonClickHandler = () => {
    this.#handleCloseButtonClick();
  };
}
