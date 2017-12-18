function promisefy(subject,operation,args = []) {
  return new Promise(function(fullfill,reject) {

    let allArgs = args.concat([function(err,rec) {
      if (err) reject(err);

      fullfill(rec);
    }]);

    operation.apply(subject,allArgs);
  });
}

module.exports = {
  promisefy: promisefy
};
