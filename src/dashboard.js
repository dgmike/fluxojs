/* eslint-env node, browser */
/* jshint esversion: 6 */
import Vue from 'vue';
import moment from 'moment';
import axios from 'axios';

import MainHeader from './main-header.vue';
import AccountTable from './account-table.vue';
import BtnAction from './btn-action.vue';
import Modal from './modal.vue';
import FormIntentEntrance from './form-intent-entrance.vue';

new Vue({ // eslint-disable-line no-new
  el: '#page',
  components: {
    MainHeader,
    AccountTable,
    BtnAction,
    Modal,
    FormIntentEntrance,
  },
  data: {
    entrances: [],
    outputs: [],
    date: null,
    showModalEntrance: false,
    blured: false,
    intentEntrance: {
      id: '',
      year: moment().get('year').toString(),
      day: '1',
      maxDay: '31',
      month: (moment().get('month') + 1).toString(),
      estimate: undefined,
      real: undefined,
      description: '',
      status: 'uncommited',
    },
  },
  mounted() {
    this.fetch(moment());
    // this.openDialog('showModalEntrance');
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
      Object.keys(this.$data).filter(key => key.indexOf('showModal') !== -1).forEach((dialog) => {
        self.$set(self.$data, dialog, false);
      });
      this.$set(this.$data, 'blured', false);
    },
    openDialog(dialogName) {
      this.$set(this.$data, dialogName, true);
      this.$set(this.$data, 'blured', true);
    },
    resetAndOpenDialog() {
      window.moment = moment;
      const date = this.$data.date || moment();

      this.$data.intentEntrance = Object.assign({}, {
        id: '',
        maxDay: date.daysInMonth().toString(),
        year: date.format('YYYY'),
        month: date.format('MM'),
        day: '1',
        estimate: '',
        real: '',
        description: '',
        status: 'uncommited',
      });

      this.openDialog('showModalEntrance');
    },
    saveEntrance(entrance) {
      const self = this;
      const url = '/api/entrances';

      axios
        .post(url, entrance)
        .then(() => {
          self.closeDialog();
          return true;
        })
        .catch(() => {
          alert('Não foi possível salvar os dados.'); // eslint-disable-line
          return false;
        });
    },
  },
  template: `
    <div>
      <main-header :date="date" v-on:update-month="updateMonth" :class="{ blured: blured }" />
      <main :class="{ blured: blured }">
        <account-table :entrances="entrances" :outputs="outputs"></account-table>
      </main>

      <btn-action icon="plus" @click="resetAndOpenDialog">Add</btn-action>

      <div v-if="showModalEntrance">
        <modal title="Adicionar uma entrada" @close="closeDialog">
          <FormIntentEntrance
            v-model="intentEntrance"
            @close="closeDialog"
            @save="saveEntrance"
          />
        </modal>
      </div>
    </div>
  `,
});
