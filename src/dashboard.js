/* eslint-env node, browser */
/* jshint esversion: 6 */
import Vue from 'vue';
import moment from 'moment';
import axios from 'axios';

import MainHeader from './main-header.vue';
import AccountTable from './account-table.vue';
import BtnAction from './btn-action.vue';
import DialogEntrance from './dialog-entrance.vue';

new Vue({ // eslint-disable-line no-new
  el: '#page',
  components: {
    MainHeader,
    AccountTable,
    BtnAction,
    DialogEntrance,
  },
  data: {
    entrances: [],
    outputs: [],
    date: null,
    showDialogEntrance: false,
    blured: false,
    intentEntrance: {
      year: moment().get('year'),
      day: 1,
      month: moment().get('month') + 1,
      estimate: undefined,
      real: undefined,
      description: '',
      status: 'uncommited',
    },
  },
  mounted() {
    this.fetch(moment());
  },
  methods: {
    fetch(date) {
      const self = this;

      const timer = setTimeout(() => {
        self.date = null;
      }, 500);

      const url = `/api/entrances?year=${date.year()}&month=${date.month() + 1}`;

      axios
        .get(url)
        .then((response) => {
          clearTimeout(timer);

          self.date = date;
          self.entrances = response.data.entrances
            .filter(e => e.estimate >= 0)
            .sort((a, b) => a.day - b.day);

          self.outputs = response.data.entrances
            .filter(e => e.estimate < 0)
            .sort((a, b) => a.day - b.day);

          return response;
        })
        .catch(() => {
          // TODO: implement error
          clearTimeout(timer);
        });
    },
    updateMonth(date) {
      this.fetch(date);
    },
    closeDialog() {
      const self = this;
      Object.keys(this.$data).filter(key => key.indexOf('showDialog') !== -1).forEach((dialog) => {
        self.$set(self.$data, dialog, false);
      });
      this.$set(this.$data, 'blured', false);
    },
    openDialog(dialogName) {
      this.$set(this.$data, dialogName, true);
      this.$set(this.$data, 'blured', true);
    },
    resetAndOpenDialog() {
      this.$set(this.$data.intentEntrance, 'year', this.$data.date.get('year'));
      this.$set(this.$data.intentEntrance, 'month', this.$data.date.get('month') + 1);
      this.$set(this.$data.intentEntrance, 'day', 1);
      this.$set(this.$data.intentEntrance, 'estimate', undefined);
      this.$set(this.$data.intentEntrance, 'real', undefined);
      this.$set(this.$data.intentEntrance, 'description', '');
      this.$set(this.$data.intentEntrance, 'status', 'uncommited');
      this.openDialog('showDialogEntrance');
    },
  },
  template: `
    <div>
      <main-header :date="date" v-on:update-month="updateMonth" :class="{ blured: blured }" />
      <main :class="{ blured: blured }">
        <account-table :entrances="entrances" :outputs="outputs"></account-table>
      </main>

      <btn-action icon="plus" @click="resetAndOpenDialog">Add</btn-action>

      <div v-if="showDialogEntrance">
        <dialog-entrance
          title="Adicionar uma entrada"
          @close="closeDialog"
        >
          <pre>{{ intentEntrance }}</pre>
        </dialog-entrance>
      </div>
    </div>
  `,
});
