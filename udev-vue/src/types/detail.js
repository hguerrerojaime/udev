module.exports = {
  components: {
    input: 'v-input-detail',
    output: 'v-output-detail'
  },
  toS(value, options = {}) {
    return JSON.stringify(value);
  }
};
