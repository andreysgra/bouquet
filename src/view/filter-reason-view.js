import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = ({type, name}, currentFilter) => `
  <div class="filter-field-text filter-reason__form-field--for-${type} filter-reason__form-field">
    <input
      class="filter-field-text__input filter-reason__form-field--for-${type} filter-reason__form-field"
      type="radio"
      id="filter-reason-field-${type}"
      name="reason"
      value="for-${type}"
      ${(currentFilter === type) ? 'checked' : ''}
    >
    <label class="filter-field-text__label" for="filter-reason-field-${type}">
      <span class="filter-field-text__text">${name}</span>
    </label>
  </div>
`;

const createFilterReasonTemplate = (filters, currentFilter) => `
  <section class="filter-reason">
    <div class="container">
      <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
      <form class="filter-reason__form" action="#" method="post">
        <div class="filter-reason__form-fields">
          ${filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('')}
        </div>
        <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
      </form>
    </div>
  </section>
`;

export default class FilterReasonView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor({filters, currentFilter}) {
    super();

    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterReasonTemplate(this.#filters, this.#currentFilter);
  }
}
