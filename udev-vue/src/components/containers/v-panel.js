const Vue = require('vue').default;

Vue.component('v-panel', {
  props: {
    title: {
      type: String
    },
    brand: {
      type: String,
      default: "default"
    }
  },
  template: `
    <div v-bind:class="'panel panel-'+brand">
      <div class="panel-heading clearfix" v-if="title">
        {{ title }}
        <div class="pull-right" v-if="hasPanelMenu">
          <slot name="panel-menu"></slot>
        </div>
      </div>
      <div class="panel-body">
        <slot></slot>
      </div>
      <div v-if="hasFooter" class="panel-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  `,
  computed: {
    hasFooter() {
      return this.$slots.footer;
    },
    hasPanelMenu() {
      return this.$slots['panel-menu'];
    }
  }
});
