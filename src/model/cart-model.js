import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class CartModel extends Observable {
  #cartApiService = null;

  #cart = {};

  constructor(cartApiService) {
    super();

    this.#cartApiService = cartApiService;
  }

  get cart() {
    return this.#cart;
  }

  async init(){
    try {
      this.#cart = await this.#cartApiService.cart;
    } catch (err) {
      this.#cart = {};
      this._notify(UpdateType.ERROR, this.#cart);
    }
  }
}
