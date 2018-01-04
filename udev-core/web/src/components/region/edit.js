module.exports = {
  template: `
  <v-panel title="Edit Region">
    <_form v-on:submit="create" ref="form"></_form>
  </v-panel>
  `,
  components: {
    '_form': require('./_form')
  },
  methods: {
    create(e) {
      let form = this.$refs.form;
      let formData = form.data();

      console.log(formData);


    }
  }
};
