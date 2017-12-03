function Spinner(target) {

  this.target = target;

  let model = $(`
    <div class="loading">
      <div class="cp-spinner cp-eclipse"></div>
    </div>
  `);

  this.show = function() {
     this.spinner = model.appendTo(target);
  }

  this.hide = function() {
     this.spinner.remove();
  }

}

module.exports = {
  default: new Spinner(document.body),
  clazz: Spinner
};
