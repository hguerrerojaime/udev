const RestController = require('./RestController');

const IndexController = RestController._extend({
  async index() {
    return {
      title: "uDev Data Manager",
      version: "alpha 0.0.1"
    };
  }
});

module.exports = IndexController;
