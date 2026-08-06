import Observable from '../framework/observable';
import {FilterColorType, FilterReasonType, UpdateType} from '../const';

export default class FiltersModel extends Observable {
  #filterReason = FilterReasonType.ALL.TYPE;
  #filterColors = [FilterColorType.ALL.TYPE];

  get filterReason() {
    return this.#filterReason;
  }

  get filterColors() {
    return this.#filterColors;
  }

  resetFilters() {
    this.#filterColors = [FilterColorType.ALL.TYPE];
    this.#filterReason = FilterReasonType.ALL.TYPE;

    this._notify(UpdateType.MINOR, null);
  }

  setFilterColors(updateType, update) {
    this.#filterColors = update;

    this._notify(updateType, update);
  }

  setFilterReason(updateType, update) {
    this.#filterReason = update;

    this._notify(updateType, update);
  }
}
