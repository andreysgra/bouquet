import ProductModalGalleryView from '../view/product-modal-gallery-view';
import ProductModalDescriptionView from '../view/product-modal-description-view';
import {remove, render, replace} from '../framework/render';

export default class ProductModalPresenter {
  #container = null;

  #product = null;

  #productModalGalleryComponent = null;
  #productModalDescriptionComponent = null;

  constructor({container}) {
    this.#container = container;
  }

  destroy() {
    remove(this.#productModalGalleryComponent);
    remove(this.#productModalDescriptionComponent);
  }

  init(product) {
    this.#product = product;

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
      product: this.#product
    });

    if (currentProductModalDescriptionComponent === null) {
      render(this.#productModalDescriptionComponent, this.#container);
    } else {
      replace(this.#productModalDescriptionComponent, currentProductModalDescriptionComponent);
      remove(currentProductModalDescriptionComponent);
    }
  }
}
