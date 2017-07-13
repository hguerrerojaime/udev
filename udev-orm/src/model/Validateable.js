import model from 'node-model';
import validate from 'validate.js';
import Model from './Model';

export default function Validateable(target) {

  function enhance(target) {

    let modelConstructor = Model()(target);

    target.meta.annotations.Validateable = Validateable;

    injectValidators(target);
    return modelConstructor;
  }

  function injectValidators(target) {
    target.prototype.isValid = function() {
      return this.attributes.isValid();
    };

    target.meta.model.validators.push(function(self) {
       let errors = validate(self.attrs,target.constraints);

       if (!errors) {
         errors = {};
       }

       for (let attr in errors) {
         let attrErrors = errors[attr];

         for (let error of attrErrors) {
           self.errors.push({attr:attr,message:error});
         }

       }

       self.attrErrors = errors;

    });
  }



  return function decorator(target) {
    return enhance(target);
  }

}
