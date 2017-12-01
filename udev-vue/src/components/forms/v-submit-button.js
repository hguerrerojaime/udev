const Vue = require('vue').default;

Vue.component('v-submit-button', {
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
    }
  },
  template: `
    <button
      type="submit"
      v-on:click="onClick"
      v-bind:class="'btn btn-'+brand"><i v-bind:class="icon" v-if="icon"></i> {{label}}</button>
  `,
  methods: {
    onClick: function() {
      this.$emit('click');
    }
  }
});
