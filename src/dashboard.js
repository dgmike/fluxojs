/* eslint-env node, browser */
import Vue from 'vue';

import AccountTable from './account-table.vue';

new Vue({ // eslint-disable-line no-new
  el: '#mainarea',
  components: {
    AccountTable,
  },
  data: {
    entrances: [
      {
        id: 1,
        day: 1,
        description: 'salário',
        estimate: 1500,
        real: 1402.23,
        status: true,
      },
      {
        id: 2,
        day: 15,
        description: 'salário (adiantamento)',
        estimate: 1500,
        real: 1402.23,
        status: false,
      },
    ],
    outputs: [
      {
        id: 3,
        day: 21,
        description: 'compras',
        estimate: -1500,
        real: -1402.23,
        status: false,
      },
      {
        id: 4,
        day: 21,
        description: 'compras',
        estimate: -2320,
        real: 0,
        status: false,
      },
    ],
  },
  template: '<account-table :entrances="entrances" :outputs="outputs"></account-table>',
});
