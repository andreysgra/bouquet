import Observable from '../framework/observable';
import {FilterColorType, FilterReasonType} from '../const';

export default class FiltersModel extends Observable {
  #filterReason = FilterReasonType.ALL.TYPE;
  #filterColors = [FilterColorType.ALL.TYPE];

  get filterReason() {
    return this.#filterReason;
  }

  get filterColors() {
    return this.#filterColors;
  }

  setFilterReason(updateType, update) {
    this.#filterReason = update;

    this._notify(updateType, update);
  }
}
