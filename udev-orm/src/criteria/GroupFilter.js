import Filter from './Filter';

export default class GroupFilter extends Filter {

  _filters = [];

  get filters() {
    return this._filters;
  }

}
