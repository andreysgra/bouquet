// Импорт вендоров и утилит, не удаляйте его
import './vendor';
import { ImageSlider } from './utils/image-slider';
import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modals/init-modals';

// Ваши импорты...
import ProductsModel from './model/products-model';
import ProductsApiService from './api-service/products-api-service';
import {AUTHORIZATION, END_POINT} from './api-service/const';

// Код для работы попапов, не удаляйте его
window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();

  window.addEventListener('load', () => {
    // Инициализация слайдера
    const imageSlider = new ImageSlider('.image-slider');
    imageSlider.init();

    // Инициализация попапов
    initModals();
  });

  const productsModel = new ProductsModel(new ProductsApiService(END_POINT, AUTHORIZATION));

  productsModel.init();
});
