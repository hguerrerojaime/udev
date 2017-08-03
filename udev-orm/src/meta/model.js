export default function model(name) {

  return class MetaModel {

    static name;
    static attrs = {};
    static validators = [];

    static attr(name,options = {}) {
      MetaModel.attrs[name] = Object.assign({},{ type: 'any' },options);

      MetaModel.prototype[name] = function(value = undefined) {
         if (!value) {
           return this.attrs[name];
         } else {

           this.attrs[name] = value;
         }
      };

      return MetaModel;
    }

    constructor(attrs = {},clean = false) {
      this._attrs = Object.assign({},attrs);
      this._cleanAttrs = clean ? this.attrs : {};
      this._errors = {};

    }

    dirty(attr) {
      return this.attrs[attr] !== this.cleanAttrs[attr];
    }

    isValid() {
      for (let validator of MetaModel.validators) {
        validator(this);
      }

      return Object.keys(this.errors).length == 0;
    }

    get attrs() {
      return this._attrs;
    }

    get cleanAttrs() {
      return this._cleanAttrs;
    }

    get errors() {
      return this._errors;
    }

    toJSON() {
      return this.attrs;
    }
  }

}
