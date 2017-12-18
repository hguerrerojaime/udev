const RestController = require('./RestController');

const ViewController = RestController._extend({
  init(viewService) {
    this.viewService = viewService;
  },
  async list(modelId) {
    let views = await this.viewService.listViews({ modelId: modelId });
    return views;
  },

  async create(modelId,$request) {
    let view = await this.viewService.createView({ modelId: modelId, data: $request.body });
    return view;
  },

  async show(modelId,id) {
    let view = await this.viewService.getView({ modelId: modelId, id: id });
    return view;
  },

  async update(modelId,$request) {

  },

  async delete(modelId,$request) {

  }
});

ViewController.$inject = ['viewService'];

module.exports = ViewController;
