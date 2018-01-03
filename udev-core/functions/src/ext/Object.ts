interface Object {
  merge(obj: any): Object;
}


Object.prototype.merge = function(obj) {
  return Object.assign({},this,obj);
}
