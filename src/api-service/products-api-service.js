import ApiService from '../framework/api-service';
import {Method} from './const';

export default class ProductsApiService extends ApiService {
  get products() {
    return this._load({url: 'products'})
      .then(ApiService.parseResponse);
  }

  async getProduct(productId) {
    const response = await this._load({url: `products/${productId}`});

    return await ApiService.parseResponse(response);
  }

  async addToCart(productId) {
    const response = await this._load({
      url: `products/${productId}`,
      method: Method.PUT
    });

    return await ApiService.parseResponse(response);
  }
}
