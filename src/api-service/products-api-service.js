import ApiService from '../framework/api-service';

export default class ProductsApiService extends ApiService {
  get products() {
    return this._load({url: 'products'})
      .then(ApiService.parseResponse);
  }

  async getProduct(productId) {
    return this._load({url: `products/${productId}`})
      .then(ApiService.parseResponse);
  }
}
