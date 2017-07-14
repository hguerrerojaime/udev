import CriteriaQuery from './CriteriaQuery';

class EntityManager {

  constructor(dataSource,persistenceContext) {
    this._dataSource = dataSource;
    this.persistenceContext = persistenceContext;
  }

  createQuery(entityClass) {
    return new CriteriaQuery(this,entityClass);
  }




}
