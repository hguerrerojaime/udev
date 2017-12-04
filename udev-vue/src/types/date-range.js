const format = require('string-format');

module.exports = {
  components: {
    input: 'v-input-date-range',
    output: 'v-output-date-range'
  },
  toS(value, options = {}) {
    let opts = Object.assign({},{
      format: "From: [{start}] To: [{end}]",
      dateFormat: "YYYY-MM-DD"
    },options);

    return format(opts.format,{
      start: value.start.format(opts.dateFormat),
      end: value.end.format(opts.dateFormat)
    });
  }
};
