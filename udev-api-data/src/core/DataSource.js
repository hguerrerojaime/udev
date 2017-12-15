const JClass = require('jclass');

const DataSource = JClass._extend({
  init(options = {}) {
    this._mongoose = options.mongoose;
    this._connection = options.mongoose.createConnection(options.url);
  },
  get connection() {
    return this._connection;
  },
  get mongoose() {
    return this._mongoose;
  }
});

module.exports = DataSource;
