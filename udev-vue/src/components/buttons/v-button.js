const Vue = require('vue').default;

Vue.component('v-button', {
  props: {
    brand: {
      type: String,
      default: "default"
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    size: {
      type: String,
      default: "md"
    }
  },
  template: `
    <button
      type="button"
      v-on:click="onClick"
      v-bind:class="'btn btn-'+brand+' btn-'+size"><i v-bind:class="icon" v-if="icon"></i> {{label}}</button>
  `,
  methods: {
    onClick: function() {
      this.$emit('click');
    }
  }
});
