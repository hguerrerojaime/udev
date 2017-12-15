const RestController = require('./RestController');

const RecordViewController = RestController._extend({
  init(recordViewer) {
    this.recordViewer = recordViewer;
  },
  async show($request) {
    let record = await this.recordViewer.get({ model:'Author__c', id: $request.params.id });
    return record;
  }
});

RecordViewController.$inject = ['recordViewer'];

module.exports = RecordViewController;
