import { injectable, inject } from "inversify";
import { ModelCreateCommand } from '../commands/ModelCreateCommand';

@injectable()
export default class ModelService {
  // 
  // static SYSTEM_FIELDS:any[] = [
  //   {
  //     name:"createdAt",
  //     type:"TIMESTAMP",
  //     label:"Created At"
  //   },
  //   {
  //     name:"updatedAt",
  //     type:"TIMESTAMP",
  //     label:"Updated At"
  //   }
  // ];
  //
  // public constructor(
  //   @inject("regionService") private regionService,
  //   @inject("pathResolver") private pathResolver
  // ) { }
  //
  // async create(command) {
  //
  //   if (this.regionService.exists(command.realmId,command.regionId)) {
  //
  //     const modelCollectionRef = this.pathResolver.lookup(
  //       `realm["${command.realmId}"]
  //       .region["${command.region}"]
  //       .model`
  //     );
  //
  //     const ref = await modelCollectionRef.add({
  //       name: `${command.name}__c`,
  //       label: command.label,
  //       pluralLabel: command.pluralLabel,
  //       description: command.description,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       createdBy: command.userId,
  //       updatedBy: command.userId
  //     });
  //
  //     await this.addKeyField({
  //       modelId: ref.id,
  //       type: command.keyFieldType,
  //       options: command.keyFieldOptions,
  //       userId: command.userId
  //     });
  //
  //     await this.addSystemFields({
  //       modelId: ref.id,
  //       userId: command.userId
  //     });
  //
  //     return ref.id;
  //   }
  //
  // }
  //
  // private async addKeyField(command) {
  //
  //   return await this.addField({
  //     modelId: command.modelId,
  //     name: "key",
  //     type: command.type,
  //     label: "Key",
  //     options: command.options,
  //     userId: command.userId
  //   });
  //
  // }
  //
  // private async addSystemFields(command) {
  //
  //   for (const systemField of ModelService.SYSTEM_FIELDS) {
  //     await this.addField({
  //       modelId: command.modelId,
  //       name: systemField.name,
  //       type: systemField.type,
  //       label: systemField.label,
  //       options: systemField.options,
  //       userId: command.userId
  //     })
  //   }
  //
  // }
  //
  //
  // async addField(command) {
  //
  //   const modelRef = this.pathResolver.lookup(
  //     `realm["${command.realmId}"]
  //     .region["${command.region}"]
  //     .model["${command.modelId}"]
  //     .field`
  //   );
  //
  //   const fieldRef = await modelRef.add({
  //     name: command.name,
  //     type: command.type,
  //     label: command.label,
  //     options: Object.assign({},command.options),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     createdBy: command.userId,
  //     updatedBy: command.userId
  //   });
  //
  //   return fieldRef.id;
  //
  // }
  //
  // async list(realmId,regionId) {
  //   const regionList = this.pathResolver.lookup(`
  //     realm["${realmId}"]
  //     .region["${regionId}"]
  //     .model
  //   `).get();
  //
  //   const result = [];
  //
  //   regionList.forEach((doc) => {
  //     result.push(Object.assign({},doc.data(),{ id: doc.id }));
  //   });
  //
  //   return result;
  // }
  //
  // async get(realmId,regionId,id) {
  //   const ref = this.pathResolver.lookup(`
  //     realm["${realmId}"]
  //     .region["${regionId}"]
  //     .model["${id}"]
  //   `);
  //   const doc = await ref.get();
  //
  //   if (doc.exists) {
  //     return Object.assign({},doc.data(), { id: id });
  //   }
  // }

}
