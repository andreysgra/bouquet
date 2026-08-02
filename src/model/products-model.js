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

  async addToCart(updateType, update){
    const index = this.#products.findIndex((product) => product.id === update);

    if (index === -1) {
      throw new Error('Can\'t add unexisting product to cart');
    }

    try {
      await this.#productsApiService.addToCart(update);
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t add product to cart');
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
