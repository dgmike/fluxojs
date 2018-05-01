/* eslint-env node, browser */
import Vue from 'vue';
import moment from 'moment';
import axios from 'axios';

import AccountTable from './account-table.vue';

new Vue({ // eslint-disable-line no-new
  el: '#mainarea',
  components: {
    AccountTable,
  },
  data: {
    entrances: [],
    outputs: [],
  },
  template: '<account-table :entrances="entrances" :outputs="outputs"></account-table>',
  mounted() {
    this.fetch(moment());
  },
  methods: {
    fetch(date) {
      const self = this;
      const url = `/api/entrances?year=${date.year()}&month=${date.month()}`;

      axios
        .get(url)
        .then((response) => {
          self.entrances = response.data.entrances.filter(e => e.estimate >= 0);
          self.outputs = response.data.entrances.filter(e => e.estimate < 0);
        });
    }
  }
});
