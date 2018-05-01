/* eslint-env node, browser */
import Vue from 'vue';
import moment from 'moment';
import jquery from 'jquery';

import AccountTable from './account-table.vue';

const mainarea = new Vue({ // eslint-disable-line no-new
  el: '#mainarea',
  components: {
    AccountTable,
  },
  data: {
    entrances: [],
    outputs: [],
  },
  template: '<account-table :entrances="entrances" :outputs="outputs"></account-table>',
  methods: {
    fetch(date) {
      const self = this;
      const url = `/api/entrances?year=${date.year()}&month=${date.month()}`;

      jquery
        .get(url)
        .then((data) => {
          self.entrances = data.entrances.filter(e => e.estimate >= 0);
          self.outputs = data.entrances.filter(e => e.estimate < 0);
        });
    }
  }
});

mainarea.fetch(moment());
