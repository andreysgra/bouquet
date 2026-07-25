import Observable from '../framework/observable';
import {FilterReasonType} from '../const';

export default class FiltersModel extends Observable {
  #filterReason = FilterReasonType.ALL.TYPE;

  get filterReason() {
    return this.#filterReason;
  }
}
