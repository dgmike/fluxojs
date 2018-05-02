/* eslint-env node, browser */
import Vue from 'vue';
import moment from 'moment';
import axios from 'axios';

import MainHeader from './main-header.vue';
import AccountTable from './account-table.vue';

new Vue({ // eslint-disable-line no-new
  el: '#page',
  components: {
    MainHeader,
    AccountTable,
  },
  data: {
    entrances: [],
    outputs: [],
    date: null,
  },
  template: `
    <div id="page">
      <main-header :date="date" v-on:update-month="updateMonth"></main-header>
      <main>
        <account-table :entrances="entrances" :outputs="outputs"></account-table>
      </main>
    </div>
  `,
  mounted() {
    this.fetch(moment());
  },
  methods: {
    fetch(date) {
      const self = this;

      self.date = moment();

      const url = `/api/entrances?year=${date.year()}&month=${date.month()}`;

      axios
        .get(url)
        .then((response) => {
          self.date = date;
          self.entrances = response.data.entrances.filter(e => e.estimate >= 0);
          self.outputs = response.data.entrances.filter(e => e.estimate < 0);
        });
    },
    updateMonth(date) {
      this.fetch(date);
    }
  }
});
