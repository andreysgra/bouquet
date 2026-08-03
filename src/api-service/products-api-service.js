import ApiService from '../framework/api-service';

export default class ProductsApiService extends ApiService {
  get products() {
    return this._load({url: 'products'})
      .then(ApiService.parseResponse);
  }

  async getProduct(productId) {
    const response = await this._load({url: `products/${productId}`});

    return await ApiService.parseResponse(response);
  }
}
