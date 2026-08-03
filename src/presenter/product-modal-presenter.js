import ProductModalGalleryView from '../view/product-modal-gallery-view';
import ProductModalDescriptionView from '../view/product-modal-description-view';
import {remove, render, replace} from '../framework/render';
import {UpdateType, UserAction} from '../const';
import {ImageSlider} from '../utils/image-slider';

export default class ProductModalPresenter {
  #container = null;

  #cartModel = null;

  #product = null;
  #imageSlider = null;

  #productModalGalleryComponent = null;
  #productModalDescriptionComponent = null;

  #handleDataChange = () => null;

  constructor({container, cartModel, onDataChange}) {
    this.#container = container;
    this.#cartModel = cartModel;
    this.#handleDataChange = onDataChange;
  }

  destroy() {
    remove(this.#productModalGalleryComponent);
    remove(this.#productModalDescriptionComponent);
    this.#imageSlider = null;
  }

  init(product) {
    this.#product = product;

    const isFavorite = this.#cartModel.products.has(product.id);
    const currentProductModalGalleryComponent = this.#productModalGalleryComponent;
    const currentProductModalDescriptionComponent = this.#productModalDescriptionComponent;

    this.#productModalGalleryComponent = new ProductModalGalleryView({
      product: this.#product
    });

    if (currentProductModalGalleryComponent === null) {
      render(this.#productModalGalleryComponent, this.#container);
    } else {
      replace(this.#productModalGalleryComponent, currentProductModalGalleryComponent);
      remove(currentProductModalGalleryComponent);
    }

    this.#productModalDescriptionComponent = new ProductModalDescriptionView({
      product: this.#product,
      isFavorite,
      onFavoriteButtonClick: this.#favoriteButtonClickHandler
    });

    if (currentProductModalDescriptionComponent === null) {
      render(this.#productModalDescriptionComponent, this.#container);
    } else {
      replace(this.#productModalDescriptionComponent, currentProductModalDescriptionComponent);
      remove(currentProductModalDescriptionComponent);
    }

    if (this.#imageSlider === null) {
      this.#imageSlider = new ImageSlider('.image-slider');
    }

    this.#imageSlider.init();
  }

  setAborting() {
    this.#productModalDescriptionComponent.shakeControl();
  }

  #favoriteButtonClickHandler = () => {
    const isFavorite = this.#cartModel.products.has(this.#product.id);

    if (isFavorite) {
      this.#handleDataChange(
        UserAction.DELETE_CART,
        UpdateType.PATCH,
        this.#product
      );
    } else {
      this.#handleDataChange(
        UserAction.ADD_CART,
        UpdateType.PATCH,
        this.#product
      );
    }
  };
}
