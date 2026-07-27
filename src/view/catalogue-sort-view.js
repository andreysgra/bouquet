import AbstractView from '../framework/view/abstract-view';

const createCatalogueSortTemplate = () => `
  <div class="catalogue__sorting">
    <div class="sorting-price">
      <h3 class="title sorting-price__title">Цена</h3>
      <a class="sorting-price__link sorting-price__link--incr sorting-price__link--active" href="#" aria-label="сортировка по возрастанию цены">
        <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
          <use xlink:href="#icon-increase-sort"></use>
        </svg>
      </a>
      <a class="sorting-price__link" href="#" aria-label="сортировка по убыванию цены">
        <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
          <use xlink:href="#icon-descending-sort"></use>
        </svg>
      </a>
    </div>
  </div>
`;

export default class CatalogueSortView extends AbstractView {
  get template() {
    return createCatalogueSortTemplate();
  }
}
