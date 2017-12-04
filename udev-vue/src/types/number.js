module.exports = {
  components: {
    input: 'v-input-number',
    output: 'v-output-number'
  },
  toS(value,locale = "en-US",options = {}) {
    let opts = Object.assign({},{},options);
    return new Intl.NumberFormat(locale,opts).format(number);
  }
};
