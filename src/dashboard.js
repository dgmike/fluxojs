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
        });
    },
    updateMonth(date) {
      this.fetch(date);
    },
  },
  template: `
    <div>
      <main-header :date="date" v-on:update-month="updateMonth"></main-header>
      <main>
        <account-table :entrances="entrances" :outputs="outputs"></account-table>
      </main>
    </div>
  `,
});
