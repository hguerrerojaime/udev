import DAO from './DAO';

export default class ModelDAO extends DAO {

  private regionDAO;

  constructor(
    db,
    recordAuditor,
    private regionDAOFactory,
    private realmId,
    private regionId
  ) {
    super(db,recordAuditor);
    this.regionDAO = this.regionDAOFactory(this.realmId);
  }

  find(id) {
    return this.collection().doc(id);
  }

  collection() {
    return this.parentRef().collection("model");
  }

  parentRef() {
    return this.regionDAO.find(this.regionId);
  }

}
