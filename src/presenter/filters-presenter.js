import {FilterReasonType} from '../const';
import FilterReasonView from '../view/filter-reason-view';
import {remove, render, replace} from '../framework/render';

export default class FiltersPresenter {
  #container = null;

  #productsModel = null;
  #filtersModel = null;

  #filterReasonComponent = null;

  constructor({container, productsModel, filtersModel}) {
    this.#container = container;

    this.#productsModel = productsModel;
    this.#filtersModel = filtersModel;

    this.#productsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get filtersReason() {
    return Object.entries(FilterReasonType)
      .map(([, value]) => (
        {
          type: value.TYPE,
          name: value.NAME
        }
      ));
  }

  init() {
    const filtersReason = this.filtersReason;
    const currentFilterReasonComponent = this.#filterReasonComponent;

    this.#filterReasonComponent = new FilterReasonView({
      filters: filtersReason,
      currentFilter: this.#filtersModel.filterReason
    });

    if (currentFilterReasonComponent === null) {
      render(this.#filterReasonComponent, this.#container);
    } else {
      replace(this.#filterReasonComponent, currentFilterReasonComponent);
      remove(currentFilterReasonComponent);
    }
  }

  #modelEventHandler = () => {
    this.init();
  };
}
