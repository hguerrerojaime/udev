import Expression from './Expression';

export default class Collection extends Expression {

  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }


}
