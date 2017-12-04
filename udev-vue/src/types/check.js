const format = require('string-format');

module.exports = {
  YES: 'Y',
  NO: 'N',
  labels: {
    Y: 'Yes',
    N: 'No'
  },
  components: {
    input: 'v-input-check',
    output: 'v-output-check'
  },
  toS(value, options = {}) {
    return value ? this.labels[this.YES] : this.labels[this.NO];
  }
};
