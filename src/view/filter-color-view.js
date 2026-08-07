import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = ({type, name}, currentFilters) => `
  <div class="filter-field-img filter-color__form-field">
    <input
      class="filter-field-img__input filter-color__form-field"
      type="checkbox"
      id="filter-colors-field-${type}"
      name="colors"
      value="${type}"
       ${(currentFilters.includes(type)) ? 'checked' : ''}
      data-filter-color="color-${type}"
    >
    <label class="filter-field-img__label" for="filter-colors-field-${type}">
      <span class="filter-field-img__img">
        <picture>
          <source type="image/webp" srcset="img/content/filter-${type}.webp, img/content/filter-${type}@2x.webp 2x">
          <img src="img/content/filter-${type}.png" srcset="img/content/filter-${type}@2x.png 2x" width="130" height="130" alt="${name}">
        </picture>
      </span>
      <span class="filter-field-img__text">${name}</span>
    </label>
  </div>
`;

const createFilterColorTemplate = (filters, currentFilters) => `
  <section class="filter-color">
    <div class="container">
      <h2 class="title title--h3 filter-color__title">Выберите основной цвет для букета</h2>
      <form class="filter-color__form" action="#" method="post">
        <div class="filter-color__form-fields" data-filter-color="filter">
          ${filters.map((filter) => createFilterItemTemplate(filter, currentFilters)).join('')}
        </div>
        <button class="visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
      </form>
    </div>
  </section>
`;

export default class FilterColorView extends AbstractView {
  #filters = null;
  #currentFilters = null;

  #handleFilterChange = () => null;

  constructor({filters, currentFilters, onFilterChange}) {
    super();

    this.#filters = filters;
    this.#currentFilters = currentFilters;

    this.#handleFilterChange = onFilterChange;

    this.element.addEventListener('click', this.#filterChangeHandler);
  }

  get template() {
    return createFilterColorTemplate(this.#filters, this.#currentFilters);
  }

  #filterChangeHandler = (evt) => {
    const element = evt.target.closest('input[name="colors"]');

    if (element) {
      const filters = [];
      const allFilterElement = this.element.querySelector('input[value="all"]');
      let filterElements = this.element.querySelectorAll('input[name="colors"]:checked');

      if (element === allFilterElement || filterElements.length === 0) {
        allFilterElement.checked = true;
      }

      if (allFilterElement.checked) {
        filterElements.forEach((filterElement) => filterElement.removeAttribute('checked'));
      }

      filterElements = this.element.querySelectorAll('input[name="colors"]:checked');
      filterElements.forEach((filterElement) => filters.push(filterElement.value));

      this.#handleFilterChange(filters);
    }
  };
}
