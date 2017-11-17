const Vue = require('vue').default;

Vue.component('v-top-bar', {
  template: `
  <nav class="navbar nav navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse"><span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span></button>
        <a class="navbar-brand" href="#">uDev AP</a>
        <ul class="nav navbar-nav navbar-top-links navbar-right">
          <li class="dropdown"><a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
            <i class="fa fa-envelope"></i> <span class="label label-danger">15</span>
          </a>
            <ul class="dropdown-menu">
              <li>
                 <a href="#">test</a>
              </li>
            </ul>
          </li>
          <li class="dropdown"><a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
            <i class="fa fa-bell"></i> <span class="label label-info">5</span>
          </a>
            <ul class="dropdown-menu">
              <li>
                 <a href="#">test</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div><!-- /.container-fluid -->
  </nav>
  `
});
