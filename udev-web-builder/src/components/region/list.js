module.exports = {

  data: function() {
    return {
      items: []
    }
  },
  mounted: function() {
    this.items = this.$superagent.get("https://us-central1-udev-373c6.cloudfunctions.net/api/realm/qheQJrr6QDyGXLKx2apO/region")
      .then((response) => {
        return response.body;
      });
  },
  template: `
  <v-panel title="Regions">
    <template slot="panel-menu">
      <v-link-button
        label="Create Region"
        icon="fa fa-plus"
        brand="success"
        href="#/region/new" />
    </template>

    <v-datatable v-model="items">
      <template slot="head">
        <v-dt-col-head field="id" label="Actions" class="actions-column"></v-dt-col-head>
        <v-dt-col-head field="name" label="Name"></v-dt-col-head>
        <v-dt-col-head field="description" label="Description"></v-dt-col-head>
      </template>
      <td slot="id" slot-scope="rec">
        <div class="btn-group">
          <v-link-button icon="fa fa-search" :href="'#/region/'+rec.value"></v-link-button>
          <v-button icon="fa fa-pencil"></v-button>
        </div>
      </td>
      <td slot="name" slot-scope="rec">
          {{ rec.value }}
      </td>
      <td slot="description" slot-scope="rec">
          {{ rec.value }}
      </td>
    </v-datatable>

  </v-panel>
  `
};
