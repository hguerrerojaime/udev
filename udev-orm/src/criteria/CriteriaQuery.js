export default class CriteriaQuery {

  constructor(entityManager,collection,groupFilter) {
    this._collection = collection;
    this._groupFilter = groupFilter;
    this._entityManager = entityManager;
  }

  list() {

  }

  get() {

  }

  get dataSource() {
    return this.entityManager.dataSource;
  }

  get entityManager() {
    return this._entityManager;
  }

}
