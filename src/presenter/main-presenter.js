import HeroView from '../view/hero-view';
import {render} from '../framework/render';

export default class MainPresenter {
  #container = null;

  #heroComponent = new HeroView();

  constructor({container}) {
    this.#container = container;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#renderHero();
  }

  #renderHero() {
    render(this.#heroComponent, this.#container);
  }
}
