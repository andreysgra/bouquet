import './vendor';
import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modals/init-modals';
import ProductsModel from './model/products-model';
import ProductsApiService from './api-service/products-api-service';
import {AUTHORIZATION, END_POINT} from './api-service/const';
import MainPresenter from './presenter/main-presenter';
import FiltersModel from './model/filters-model';
import CartModel from './model/cart-model';
import CartApiService from './api-service/cart-api-service';
import FavoriteCountPresenter from './presenter/favorite-count-presenter';

window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();

  const siteMainElement = document.querySelector('main');
  const modalProductElement = document.querySelector('.modal-product');
  const headerContainerElement = document.querySelector('.header__container');

  const productsModel = new ProductsModel(new ProductsApiService(END_POINT, AUTHORIZATION));
  const cartModel = new CartModel(new CartApiService(END_POINT, AUTHORIZATION));
  const filtersModel = new FiltersModel();

  const mainPresenter = new MainPresenter({
    container: siteMainElement,
    modalContainer: modalProductElement,
    productsModel,
    filtersModel,
    cartModel
  });

  const favoriteCountPresenter = new FavoriteCountPresenter({
    container: headerContainerElement,
    cartModel
  });

  mainPresenter.init();

  (async () => {
    try {
      await Promise.all([
        cartModel.init(),
        productsModel.init()
      ]);

      favoriteCountPresenter.init();
      initModals();
    } catch (err) {
      return null;
    }
  })();
});
