import DAO from './DAO';

import { FieldType } from '../core/FieldType';

export default class LayoutDAO extends DAO {

  private static RECORD_INFO_SECTION:any = {
    title: "Record Information",
    visible: "READ",
    columns: [
      ['createdAt','updatedAt'],
      ['createdBy','updatedBy']
    ]
  };

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
    return this.parentRef().collection("layout");
  }

  parentRef() {
    return this.regionDAO.find(this.regionId);
  }

  findByName(name) {
    return this.collection().where("name","==",name).limit(1);
  }

  addLayout(command) {
    return this.add(this.collection(),command.currentAccount,{
      name: command.name,
      modelName: command.modelName,
      visible: "ALL",
      sections: [
        {
          title: "Record Data",
          columns: [
            [ 'key' ],['BLANK']
          ]
        },
        LayoutDAO.RECORD_INFO_SECTION
      ]
    });
  }

  updateLayout(id,command) {
    return this.set(this.find(id),command.currentAccount,{
      sections: [].concat(command.sections,[LayoutDAO.RECORD_INFO_SECTION])
    },true);
  }

  addModel(command,custom = true) {
    return this.add(this.collection(),command.currentAccount,{
      name: custom ? `${command.name}__c` : command.name,
      label: command.label,
      pluralLabel: command.pluralLabel,
      description: command.description
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
