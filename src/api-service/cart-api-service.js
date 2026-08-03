import ApiService from '../framework/api-service';
import {Method} from './const';

export default class CartApiService extends ApiService {
  get cart() {
    return this._load({url: 'cart'})
      .then(ApiService.parseResponse);
  }

  async add(productId) {
    const response = await this._load({
      url: `products/${productId}`,
      method: Method.PUT
    });

    return await ApiService.parseResponse(response);
  }

  async delete(productId) {
    await this._load({
      url: `products/${productId}`,
      method: Method.DELETE
    });
  }
}
