import DAO from './DAO';

import { FieldType } from '../core/FieldType';

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

  addModel(command,custom = true,transaction = null) {
    const modelName = custom ? `${command.name}__c` : command.name;
    return this.set(this.collection().doc(modelName),command.currentAccount,{
      label: command.label,
      pluralLabel: command.pluralLabel,
      description: command.description
    });
  }


  addField(modelId,command,custom = true, transaction = null) {
    const defaultFieldOptions = FieldType.valueOf(command.type).defaultOptions;
    const fieldName = custom ? `${command.name}__c` : command.name;

    return this.set(this.fieldCollection(modelId).doc(fieldName),command.currentAccount,{
      type: command.type,
      label: command.label,
      options: Object.assign({},defaultFieldOptions,command.options)
    },false,transaction);
  }

}
