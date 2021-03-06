const Vue = require('vue').default;

Vue.component('v-top-bar', {
  props: {
    title: {
      type: String,
      default: "Application"
    }
  },
  template: `
  <nav class="navbar nav navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse"><span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span></button>
        <a class="navbar-brand" href="#/" style="text-transform:none;">{{ title }}</a>

      </div>
    </div><!-- /.container-fluid -->
  </nav>
  `
});
