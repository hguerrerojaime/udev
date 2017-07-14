import Query from './Query';

export default class CriteriaQuery {

  constructor(em,entityClass) {
    this.em = em;
    this.entityClass = entityClass;
  }

  list() {}

  get() {}


}
