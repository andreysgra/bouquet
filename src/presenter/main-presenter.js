import HeroView from '../view/hero-view';
import {remove, render} from '../framework/render';
import MissionView from '../view/mission-view';
import AdvantagesView from '../view/advantages-view';
import FiltersPresenter from './filters-presenter';
import CataloguePresenter from './catalogue-presenter';
import CatalogueLoadingView from '../view/catalogue-loading-view';
import {UpdateType} from '../const';

export default class MainPresenter {
  #container = null;

  #productsModel = null;
  #filtersModel = null;

  #filtersPresenter = null;
  #cataloguePresenter = null;

  #isLoading = true;

  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();
  #catalogueLoadingComponent = new CatalogueLoadingView();

  constructor({container, productsModel, filtersModel}) {
    this.#container = container;

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
      container: this.#container
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

  #modelEventHandler = async (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#renderBoard();
        break;
    }
  };
}
