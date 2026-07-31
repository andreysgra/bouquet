import HeroView from '../view/hero-view';
import {remove, render} from '../framework/render';
import MissionView from '../view/mission-view';
import AdvantagesView from '../view/advantages-view';
import FiltersPresenter from './filters-presenter';
import CataloguePresenter from './catalogue-presenter';
import CatalogueLoadingView from '../view/catalogue-loading-view';
import {UpdateType} from '../const';
import ProductModalPresenter from './product-modal-presenter';
import {modals} from '../modals/init-modals';
import {ImageSlider} from '../utils/image-slider';

export default class MainPresenter {
  #container = null;
  #modalContainer = null;

  #productsModel = null;
  #filtersModel = null;

  #filtersPresenter = null;
  #cataloguePresenter = null;
  #productModalPresenter = null;

  #isLoading = true;
  #selectedProduct = null;

  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();
  #catalogueLoadingComponent = new CatalogueLoadingView();

  constructor({container, modalContainer, productsModel, filtersModel}) {
    this.#container = container;
    this.#modalContainer = modalContainer;

    this.#productsModel = productsModel;
    this.#filtersModel = filtersModel;

    this.#productsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    this.#renderHero();
    this.#renderMission();
    this.#renderAdvantages();
    this.#renderBoard();
  }

  #addProductModal = (product) => {
    if (this.#selectedProduct && this.#selectedProduct.id === product.id) {
      return;
    }

    this.#selectedProduct = product;
    this.#renderProductModal().then(() => new ImageSlider('.image-slider').init());
  };

  #removeProductModal() {
    this.#productModalPresenter.destroy();
    this.#productModalPresenter = null;
    this.#selectedProduct = null;
  }

  #renderAdvantages() {
    render(this.#advantagesComponent, this.#container);
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderCatalogueLoading();

      return;
    }

    remove(this.#catalogueLoadingComponent);

    this.#renderFilters();

    this.#cataloguePresenter = new CataloguePresenter({
      container: this.#container,
      productsModel: this.#productsModel,
      filterModel: this.#filtersModel,
      onCardClick: this.#addProductModal
    });

    this.#cataloguePresenter.init();
  }

  #renderCatalogueLoading() {
    render(this.#catalogueLoadingComponent, this.#container);
  }

  #renderFilters() {
    this.#filtersPresenter = new FiltersPresenter({
      container: this.#container,
      productsModel: this.#productsModel,
      filtersModel: this.#filtersModel
    });

    this.#filtersPresenter.init();
  }

  #renderHero() {
    render(this.#heroComponent, this.#container);
  }

  #renderMission() {
    render(this.#missionComponent, this.#container);
  }

  async #renderProductModal() {
    modals._settings.default.closeCallback = () => this.#removeProductModal();
    modals._setSettings('default');

    const product = await this.#productsModel.getProduct(this.#selectedProduct.id);

    if (this.#productModalPresenter === null) {
      this.#productModalPresenter = new ProductModalPresenter({
        container: this.#modalContainer
      });
    }

    this.#productModalPresenter.init(product);
  }

  #modelEventHandler = async (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#renderBoard();
        break;
    }
  };
}
