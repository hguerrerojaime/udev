module.exports = {
  components: {
    input: 'v-input-multiselect',
    output: 'v-output-multiselect'
  },
  toS(value, options = {}) {
    return value.toString();
  }
};
