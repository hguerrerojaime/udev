const format = require('string-format');

module.exports = {
  dataTypes: require('./types/index'),
  dependencyKeys: Object.keys(require('./dependencies'))
};
