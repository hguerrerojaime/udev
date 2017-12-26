module.exports = {
  template: `
  <v-panel title="Create Region">
    <template slot="panel-menu">
      <v-link-button label="Create Region" icon="fa fa-plus" brand="success"></v-link-button>
    </template>
  </v-panel>
  `,
  components: {
    '_form': require('./_form')
  }
};
