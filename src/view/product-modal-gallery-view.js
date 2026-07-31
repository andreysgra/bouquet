import AbstractView from '../framework/view/abstract-view';

const createSlidesTemplate = (product) => {
  const {images, authorPhoto, title} = product;

  return images.map((image) => `
    <div class="image-slides-list__item swiper-slide">
      <div class="image-slide">
        <picture>
          <source type="image/webp" srcset="${image}, ${image} 2x">
          <img src="${image}" srcset="${image} 2x" width="1274" height="1789" alt="${title}">
        </picture><span class="image-author image-slide__author">Автор фотографии: «${authorPhoto}»</span>
      </div>
    </div>
  `).join('');
};

const createProductModalGalleryTemplate = (product) => `
  <div class="image-slider swiper modal-product__slider">
    <div class="image-slides-list swiper-wrapper">
      ${createSlidesTemplate(product)}
    </div>
    <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev" type="button">
      <svg width="80" height="85" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-round-button"></use>
      </svg>
    </button>
    <button class="btn-round btn-round--to-right image-slider__button image-slider__button--next" type="button">
      <svg width="80" height="85" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-round-button"></use>
      </svg>
    </button>
  </div>
`;

export default class ProductModalGalleryView extends AbstractView {
  #product = null;

  constructor({product}) {
    super();

    this.#product = product;
  }

  get template() {
    return createProductModalGalleryTemplate(this.#product);
  }
}
