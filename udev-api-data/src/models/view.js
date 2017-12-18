const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  attributes: {
    name: String,
    model: { type: Schema.Types.ObjectId },
    query: {
      filter: { type: Schema.Types.Mixed },
      sort: { type: Schema.Types.Mixed },
      select: { type: Schema.Types.Mixed }
    }
  }
};
