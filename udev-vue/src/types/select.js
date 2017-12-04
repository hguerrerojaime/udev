module.exports = {
  components: {
    input: 'v-input-select',
    output: 'v-output-select'
  },
  toS(value, options = {}) {
    return value.toString();
  }
};
