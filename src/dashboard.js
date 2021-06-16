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
            .filter((e) => e.estimate >= 0)
            .sort((a, b) => a.day - b.day);

          self.outputs = response.data.entrances
            .filter((e) => e.estimate < 0)
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
    openDialog() {
      // console.info('open dialog');
    },
    resetAndOpenDialog() {
      // console.info('reset dialog');
      this.$set(this.$data.intentEntrance, 'year', this.$data.date.get('year'));
      this.$set(this.$data.intentEntrance, 'month', this.$data.date.get('month') + 1);
      this.$set(this.$data.intentEntrance, 'day', 1);
      this.$set(this.$data.intentEntrance, 'estimate', undefined);
      this.$set(this.$data.intentEntrance, 'real', undefined);
      this.$set(this.$data.intentEntrance, 'description', '');
      this.$set(this.$data.intentEntrance, 'status', 'uncommited');
      this.openDialog();
    },
  },
  template: `
    <div>
      <main-header :date="date" v-on:update-month="updateMonth"></main-header>
      <main>
        <account-table :entrances="entrances" :outputs="outputs"></account-table>
      </main>
      <btn-action icon="plus" v-on:intent-to-add-entrance="resetAndOpenDialog">Add</btn-action>
      <dialog-entrance
        :day="intentEntrance.day"
        :month="intentEntrance.month"
        :year="intentEntrance.year"
        :estimate="intentEntrance.estimate"
        :real="intentEntrance.real"
        :description="intentEntrance.description"
        :status="intentEntrance.status"
        ></dialog-entrance>
    </div>
  `,
});
