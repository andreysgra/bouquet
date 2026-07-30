import './vendor';
import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modals/init-modals';
import ProductsModel from './model/products-model';
import ProductsApiService from './api-service/products-api-service';
import {AUTHORIZATION, END_POINT} from './api-service/const';
import MainPresenter from './presenter/main-presenter';
import FiltersModel from './model/filters-model';

window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();

  const siteMainElement = document.querySelector('main');
  const modalProductElement = document.querySelector('.modal-product');

  const productsModel = new ProductsModel(new ProductsApiService(END_POINT, AUTHORIZATION));
  const filtersModel = new FiltersModel();

  const mainPresenter = new MainPresenter({
    container: siteMainElement,
    modalContainer: modalProductElement,
    productsModel,
    filtersModel
  });

  mainPresenter.init();

  productsModel.init().then(() => initModals());
});
