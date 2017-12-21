const Vue = require('vue').default;

Vue.component('v-side-bar', {
  props: {
    defaultAppCode: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      filteredItems: this.$props.menuItems,
      selectedApplication: this.$props.defaultAppCode
    }
  },
  methods: {
    filterItems(term) {
      this.filteredItems = this.$props.menuItems.filter(function(item) { return item.label.toUpperCase().indexOf(term.toUpperCase()) >=0; });
    }
  },
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
    <div class="profile-sidebar" style="padding: 0;">
      <slot name="navigator"></slot>
    </div>
    <div class="divider"></div>
    <form role="search">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Menu Search" @input="filterItems($event.target.value)">
      </div>
    </form>
    <ul class="nav menu">
      <slot name="menu-items"></slot>
    </ul>
  </div>
  `
});
