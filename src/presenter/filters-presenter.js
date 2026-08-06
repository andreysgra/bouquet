import {FilterColorType, FilterReasonType, UpdateType} from '../const';
import FilterReasonView from '../view/filter-reason-view';
import {remove, render, replace} from '../framework/render';
import FilterColorView from '../view/filter-color-view';

export default class FiltersPresenter {
  #container = null;

  #productsModel = null;
  #filtersModel = null;

  #filterReasonComponent = null;
  #filterColorComponent = null;

  constructor({container, productsModel, filtersModel}) {
    this.#container = container;

    this.#productsModel = productsModel;
    this.#filtersModel = filtersModel;

    this.#productsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get filtersColor() {
    return Object.entries(FilterColorType)
      .map(([, value]) => (
        {
          type: value.TYPE,
          name: value.NAME
        }
      ));
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

  destroy() {
    remove(this.#filterReasonComponent);
    remove(this.#filterColorComponent);
  }

  init() {
    const currentFilterReasonComponent = this.#filterReasonComponent;
    const currentFilterColorComponent = this.#filterColorComponent;

    this.#filterReasonComponent = new FilterReasonView({
      filters: this.filtersReason,
      currentFilter: this.#filtersModel.filterReason,
      onFilterChange: this.#filterReasonChangeHandler
    });

    if (currentFilterReasonComponent === null) {
      render(this.#filterReasonComponent, this.#container);
    } else {
      replace(this.#filterReasonComponent, currentFilterReasonComponent);
      remove(currentFilterReasonComponent);
    }

    this.#filterColorComponent = new FilterColorView({
      filters: this.filtersColor,
      currentFilters: this.#filtersModel.filterColors,
      onFilterChange: this.#filterColorChangeHandler
    });

    if (currentFilterColorComponent === null) {
      render(this.#filterColorComponent, this.#container);
    } else {
      replace(this.#filterColorComponent, currentFilterColorComponent);
      remove(currentFilterColorComponent);
    }
  }

  #filterColorChangeHandler = (filterTypes) => {
    this.#filtersModel.setFilterColors(UpdateType.MAJOR, filterTypes);
  };

  #filterReasonChangeHandler = (filterType) => {
    if (this.#filtersModel.filterReason === filterType) {
      return;
    }

    this.#filtersModel.setFilterReason(UpdateType.MAJOR, filterType);
  };

  #modelEventHandler = () => {
    this.init();
  };
}
