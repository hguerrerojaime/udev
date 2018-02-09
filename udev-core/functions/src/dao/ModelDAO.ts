import DAO from './DAO';

import { FieldType } from '../core/FieldType';
import systemModels from '../core/systemModels';

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

  fieldCollection(modelId) {
    return this.find(modelId).collection("field");
  }

  parentRef() {
    return this.regionDAO.find(this.regionId);
  }

  addModel(command,custom = true) {
    return this.add(this.collection(),command.currentAccount,{
      name: custom ? `${command.name}__c` : command.name,
      label: command.label,
      pluralLabel: command.pluralLabel,
      description: command.description
    });
  }

  createSystemModels() {
    const batch = this.db.batch();

    systemModels.forEach((systemModel) => {



    });

  }

  addField(modelId,command,custom = true) {
    const defaultFieldOptions = FieldType.valueOf(command.type).defaultOptions;

    return this.add(this.fieldCollection(modelId),command.currentAccount,{
      name: custom ? `${command.name}__c` : command.name,
      type: command.type,
      label: command.label,
      options: Object.assign({},defaultFieldOptions,command.options)
    });
  }

}
