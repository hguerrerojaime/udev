export default class EntityManager {

  constructor(dataSource,persistenceContext) {
    this._dataSource = dataSource;
    this._persistenceContext = persistenceContext;
  }

  get dataSource() {
    return this._dataSource;
  }

  get persistenceContext() {
    return this._persistenceContext;
  }



}
