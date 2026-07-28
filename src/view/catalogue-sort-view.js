import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';
import classNames from 'classnames';

const createCatalogueSortTemplate = (currentSortType) => `
  <div class="catalogue__sorting">
    <div class="sorting-price">
      <h3 class="title sorting-price__title">Цена</h3>
      <a
        class="${classNames('sorting-price__link sorting-price__link--incr ', {'sorting-price__link--active': currentSortType === SortType.ASCENDING})}"
        href="#"
        aria-label="сортировка по возрастанию цены"
        data-sort-type="${SortType.ASCENDING}">
        <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
          <use xlink:href="#icon-increase-sort"></use>
        </svg>
      </a>
      <a
        class="${classNames('sorting-price__link', {'sorting-price__link--active': currentSortType === SortType.DESCENDING})}"
        href="#"
        aria-label="сортировка по убыванию цены"
        data-sort-type="${SortType.DESCENDING}">
        <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
          <use xlink:href="#icon-descending-sort"></use>
        </svg>
      </a>
    </div>
  </div>
`;

export class CatalogueSortView extends AbstractView {
  #sortType = null;

  #handleSortTypeChange = () => null;

  constructor({sortType, onSortTypeChange}) {
    super();

    this.#sortType = sortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createCatalogueSortTemplate(this.#sortType);
  }

  #sortTypeChangeHandler = (evt) => {
    const sortElement = evt.target.closest('.sorting-price__link');

    if (sortElement) {
      evt.preventDefault();

      this.#handleSortTypeChange(sortElement.dataset.sortType);
    }
  };
}
