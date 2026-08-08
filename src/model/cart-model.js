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
      throw new Error(`Can't add product ${update.id} to cart`);
    }
  }

  async delete(updateType, update){
    try {
      await this.#cartApiService.delete(update.id);
      this.#cart = await this.#cartApiService.cart;

      this._notify(updateType, update);
    } catch (err) {
      throw new Error(`Can't delete product ${update.id} from cart`);
    }
  }

  async deleteProduct(updateType, update) {
    const productCount = this.products.get(update.id);

    for (let i = 0; i < productCount; i++) {
      try {
        await this.#cartApiService.delete(update.id);
      } catch (err) {
        throw new Error(`Can't delete product ${update.id} from cart`);
      }
    }

    this.#cart = await this.#cartApiService.cart;
    this._notify(updateType, null);
  }

  async deleteAllProducts(updateType){

    for (const productId in this.cart.products) {
      const productCount = this.products.get(productId);

      for (let i = 0; i < productCount; i++) {
        try {
          await this.#cartApiService.delete(productId);
        } catch (err) {
          throw new Error(`Can't delete product ${productId} from cart`);
        }
      }
    }

    this.#cart = await this.#cartApiService.cart;
    this._notify(updateType, null);
  }

  async init(){
    const emptyCart = {
      products: {},
      productCount: 0,
      sum: 0,
    };

    try {
      const cart = await this.#cartApiService.cart;

      if (Object.keys(cart).length === 0) {
        this.#cart = {...emptyCart};
      } else {
        this.#cart = cart;
      }

      this._notify(UpdateType.INIT_CART, this.#cart);
    } catch (err) {
      this.#cart = {...emptyCart};
      this._notify(UpdateType.ERROR, this.#cart);
    }
  }
}
