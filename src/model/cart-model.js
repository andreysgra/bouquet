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

  get products() {
    const products = (this.cart.products) ? Object.entries(this.cart.products) : [];

    return new Map(products);
  }

  async add(updateType, update){
    try {
      await this.#cartApiService.add(update.id);
      this.#cart = await this.#cartApiService.cart;

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t add product to cart');
    }
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
