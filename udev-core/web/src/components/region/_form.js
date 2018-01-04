module.exports = {
  props: {
    recordId: String
  },
  data: function() {
    return {
      form: {
        name: undefined,
        description: undefined
      }
    };
  },
  methods: {
    emitSubmit(e) {
      this.$emit('submit',e);
    },
    data() {
      return this.form;
    }
  },
  template: `
    <v-record-form v-bind:record-id="recordId" v-on:submit="emitSubmit">
      <v-div-row>
        <v-div-col :width="6">
          <v-form-group label="Name">
            <v-input-text v-model="form.name" v-if="!recordId"></v-input-text>
            <div v-else>{{ form.name }}</div>
          </v-form-group>
          <v-form-group label="Description">
            <v-input-text v-model="form.description"></v-input-text>
          </v-form-group>
        </v-div-col>
      </v-div-row>
    </v-record-form>
  `
};
