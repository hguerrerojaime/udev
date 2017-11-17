const Vue = require('vue').default;

Vue.component('v-body', {
  template: `
  <div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
    <div class="row">
      <ol class="breadcrumb">
        <li><a href="#">
          <em class="fa fa-home"></em>
        </a></li>
        <li class="active">Dashboard</li>
      </ol>
    </div><!--/.row-->
    <div class="row">
			<div class="col-md-12">
        <slot>

        </slot>
			</div>
		</div>
   </div>
  `
});
