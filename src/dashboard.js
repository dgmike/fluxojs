/* eslint-env node, browser */
import Vue from 'vue';
import AccountLines from './account-lines.vue';
import AccountLine from './account-line.vue';

const numeral = require('numeral');
require('numeral/locales/pt-br');

numeral.locale('pt-br');

Vue.component(
  'account-table',
  {
    components: {
      AccountLines,
      AccountLine,
    },
    props: ['entrances', 'outputs'],
    computed: {
      totals() {
        const estimateEntrances = this.$props.entrances
          .map(e => e.estimate || 0)
          .reduce((a, b) => { const c = b + a; return c; }, 0);

        const estimateOutputs = this.$props.outputs
          .map(e => e.estimate || 0)
          .reduce((a, b) => { const c = b + a; return c; }, 0);

        const estimateValue = estimateEntrances + estimateOutputs;

        const realEntrances = this.$props.entrances
          .map(e => e.real || 0)
          .reduce((a, b) => { const c = b + a; return c; }, 0);

        const realOutputs = this.$props.outputs
          .map(e => e.real || 0)
          .reduce((a, b) => { const c = b + a; return c; }, 0);

        const realValue = realEntrances + realOutputs;

        const real = realValue ? numeral(realValue).format('$ 0,0.00') : '-';
        const estimate = estimateValue ? numeral(estimateValue).format('$ 0,0.00') : '-';

        return {
          estimate,
          real,
          estimateValue,
          realValue,
        };
      },
    },
    template: `
      <table>
        <thead>
          <th>Dia</th>
          <th>Descrição</th>
          <th>Estimativa</th>
          <th>Valor Real</th>
          <th>Estado</th>
          <th>Ações</th>
        </thead>
        <tfoot>
          <tr>
            <th colspan="2">Total</th>
            <th>{{ totals.estimate }}</th>
            <th>{{ totals.real }}</th>
            <th colspan="3"></th>
          </tr>
        </tfoot>
        <account-lines title="Entradas">
          <account-line
            v-for="line in entrances"
            :key="line.id"
            :day="line.day"
            :description="line.description"
            :estimate="line.estimate"
            :real="line.real"
            :status="line.status"
          ></account-line>
        </account-lines>
        <account-lines title="Saidas">
          <account-line
            v-for="line in outputs"
            :key="line.id"
            :day="line.day"
            :description="line.description"
            :estimate="line.estimate"
            :real="line.real"
            :status="line.status"
          ></account-line>
        </account-lines>
      </table>
    `,
  },
);

new Vue({ // eslint-disable-line no-new
  el: '#mainarea',
  template: '<account-table :entrances="entrances" :outputs="outputs"></account-table>',
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
});
