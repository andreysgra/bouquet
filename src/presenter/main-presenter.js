import HeroView from '../view/hero-view';
import {render} from '../framework/render';
import MissionView from '../view/mission-view';
import AdvantagesView from '../view/advantages-view';
import FiltersPresenter from './filters-presenter';
import CataloguePresenter from './catalogue-presenter';

export default class MainPresenter {
  #container = null;

  #productsModel = null;
  #filtersModel = null;

  #filtersPresenter = null;
  #cataloguePresenter = null;

  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();

  constructor({container, productsModel, filtersModel}) {
    this.#container = container;

    this.#productsModel = productsModel;
    this.#filtersModel = filtersModel;
  }

  init() {
    this.#renderBoard();
  }

  #renderAdvantages() {
    render(this.#advantagesComponent, this.#container);
  }

  #renderBoard() {
    this.#renderHero();
    this.#renderMission();
    this.#renderAdvantages();
    this.#renderFilters();

    this.#cataloguePresenter = new CataloguePresenter({
      container: this.#container
    });

    this.#cataloguePresenter.init();
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
}
