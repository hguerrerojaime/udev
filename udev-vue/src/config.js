const format = require('string-format');

module.exports = {
  types: {
    text: {
      toS(value, options = {}) {
        return value;
      }
    },
    phone: {
      toS(value, options = {}) {
        return format("{number} ({type})",value);
      }
    }
  }

};
