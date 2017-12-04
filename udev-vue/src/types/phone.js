const format = require('string-format');

module.exports = {
  LAND_LINE: 'L',
  MOBILE: 'M',
  FAX: 'F',
  types: {
    L: {
      label: "Land Line",
      icon: "fa fa-phone"
    },
    M: {
      label: "Mobile",
      icon: "fa fa-mobile"
    },
    F: {
      label: "Fax",
      icon: "fa fa-fax"
    }
  },
  components: {
    input: 'v-input-phone',
    output: 'v-output-phone'
  },
  toS(value, options = {}) {
    return format("({type}) {number}",value);
  }
};
