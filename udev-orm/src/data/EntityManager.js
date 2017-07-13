class EntityManager {

  constructor(dataSource,persistenceContext) {
    this.dataSource = dataSource;
    this.persistenceContext = persistenceContext;
  }

  get entities() {
    return this.entities;
  }

  get dataSource() {
    return this.dataSource;
  }



}
