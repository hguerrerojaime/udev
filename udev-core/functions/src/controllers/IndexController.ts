import RestController from './RestController';

export default class IndexController extends RestController {

  async about() {
    return {
      name: "Application Builder",
      version: "alpha-0.0.1"
    };
  }

}
