const JClass = require('jclass');

const parameterfy = require('../core/util').parameterfy;

const RequestProcessor = JClass._extend({
  process(controller,action,req,res) {

    let actionProxy = parameterfy(action,controller);
    let actionPromise = actionProxy({
      $request: req,
      $response: res
    });

    controller.setResponseContentType(response);
    controller.processResponse(actionPromise,response);
  }
});
