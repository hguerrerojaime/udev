import validate from 'validate.js';
import Model from './Model';

export default function Validateable(target,annotation = Validateable) {

  function enhance(target) {

    let modelConstructor = Model(target,annotation);

    target.meta.annotations.Validateable = Validateable;

    injectValidators(target);
    return modelConstructor;
  }

  function injectValidators(target) {
    target.prototype.isValid = function() {
      return this.model.isValid();
    };

    target.meta.model.validators.push(function(self) {

       let errors = validate(self.attrs,target.constraints);

       if (!errors) {
         errors = {};
       }

       self._errors = errors;

      //  for (let attr in errors) {
       //
      //    if (!self.errors[attr]) {
      //      self.errors[attr] = [];
      //    }
       //
      //    self.errors[attr].push(errors[attr]);
      //  }



    });
  }

  return enhance(target);
}
