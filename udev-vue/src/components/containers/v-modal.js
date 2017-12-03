const Vue = require('vue').default;

Vue.component('v-modal', {
  props: {
    title: {
      type: String,
      default: "Alert"
    }
  },
  template: `
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title pull-left">{{ title }}</h4>
          <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="hasFooter">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
   </div>
  `,
  methods: {
    show() {
      $(this.$el).modal('show');
    },
    hide() {
      $(this.$el).modal('hide');
    }
  },
  mounted: function() {
    $(this.$el).modal({show:false});
  },
  computed: {
    hasFooter() {
      return this.$slots.footer;
    }
  }
});
