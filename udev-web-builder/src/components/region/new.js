module.exports = {
  template: `
  <v-panel title="Create Region">
    <_form v-on:submit="create" ref="form"></_form>
  </v-panel>
  `,
  components: {
    '_form': require('./_form')
  },
  methods: {
    create(e) {
      e.preventDefault();
      let form = this.$refs.form;
      let formData = form.data();

      this.$spinner.show();

      this.$superagent.post("https://us-central1-udev-373c6.cloudfunctions.net/api/realm/qheQJrr6QDyGXLKx2apO/region",formData)
        .then((response) => {
          this.$spinner.hide();
          this.$router.push('/region');
      });


    }
  }
};
