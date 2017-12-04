module.exports = {
  components: {
    input: 'v-input-date',
    output: 'v-output-date'
  },
  toS(value, options = {}) {

    if (value) {
      let opts = Object.assign({},{
        format: "YYYY-MM-DD"
      },options);
      return value.format(opts.format);
    }
  }
};
