import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = ({type, name}, currentFilter) => `
  <div class="filter-field-img filter-color__form-field">
    <input
      class="filter-field-img__input filter-color__form-field"
      type="checkbox"
      id="filter-colors-field-${type}"
      name="colors"
      value="color-${type}"
       ${(currentFilter === type) ? 'checked' : ''}
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

const createFilterColorTemplate = (filters, currentFilter) => `
  <section class="filter-color">
    <div class="container">
      <h2 class="title title--h3 filter-color__title">Выберите основной цвет для букета</h2>
      <form class="filter-color__form" action="#" method="post">
        <div class="filter-color__form-fields" data-filter-color="filter">
          ${filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('')}
        </div>
        <button class="visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
      </form>
    </div>
  </section>
`;

export default class FilterColorView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor({filters, currentFilter}) {
    super();

    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterColorTemplate(this.#filters, this.#currentFilter);
  }
}
