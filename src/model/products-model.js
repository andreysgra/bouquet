import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class ProductsModel extends Observable {
  #productsApiService = null;

  #products = [];
  #product = {};

  constructor(productsApiService) {
    super();

    this.#productsApiService = productsApiService;
  }

  get products() {
    return this.#products;
  }

  async init() {
    try {
      this.#products = await this.#productsApiService.products;
      this._notify(UpdateType.INIT, this.#products);
    } catch (err) {
      this.#products = [];
      this._notify(UpdateType.ERROR, this.#products);
    }
  }

  async getProduct(productId){
    try {
      this.#product = await this.#productsApiService.getProduct(productId);
    } catch (err) {
      this.#product = {};
      this._notify(UpdateType.ERROR, this.#product);
    }

    return this.#product;
  }
}
