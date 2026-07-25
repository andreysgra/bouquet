import HeroView from '../view/hero-view';
import {render} from '../framework/render';
import MissionView from '../view/mission-view';
import AdvantagesView from '../view/advantages-view';

export default class MainPresenter {
  #container = null;

  #heroComponent = new HeroView();
  #missionComponent = new MissionView();
  #advantagesComponent = new AdvantagesView();

  constructor({container}) {
    this.#container = container;
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
  }

  #renderHero() {
    render(this.#heroComponent, this.#container);
  }

  #renderMission() {
    render(this.#missionComponent, this.#container);
  }
}
