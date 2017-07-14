export default class DataSource {

  constructor(params = {}) {
    this._params = params;
  }

  connect() {
     return new Promise((fullfill,reject) => {
       fullfill();
     });
  }

  get params() {
    return this._params;
  }

}
