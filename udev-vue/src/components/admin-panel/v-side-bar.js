const Vue = require('vue').default;

Vue.component('v-side-bar', {
  template: `
  <div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar collapse in" aria-expanded="true" style="">
    <div class="profile-sidebar">
      <div class="profile-userpic">
        <img src="http://placehold.it/50/30a5ff/fff" class="img-responsive" alt="">
      </div>
      <div class="profile-usertitle">
        <div class="profile-usertitle-name">Humberto Guerrero</div>
        <div class="profile-usertitle-status"><span class="indicator label-success"></span>Online</div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="divider"></div>
    <form role="search">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search">
      </div>
    </form>
    <ul class="nav menu">
      <li><a href="index.html"><em class="fa fa-dashboard">&nbsp;</em> Dashboard</a></li>
      <li><a href="widgets.html"><em class="fa fa-calendar">&nbsp;</em> Widgets</a></li>
      <li><a href="charts.html"><em class="fa fa-bar-chart">&nbsp;</em> Charts</a></li>
      <li><a href="elements.html"><em class="fa fa-toggle-off">&nbsp;</em> UI Elements</a></li>
      <li><a href="panels.html"><em class="fa fa-clone">&nbsp;</em> Alerts &amp; Panels</a></li>
      <li><a href="login.html"><em class="fa fa-power-off">&nbsp;</em> Logout</a></li>
    </ul>
  </div>
  `
});
