/* eslint-env node, browser */
import Vue from 'vue';
import AccountLines from './account-lines.vue';
import AccountLine from './account-line.vue';

Vue.component(
  'account-table',
  {
    components: {
      AccountLines,
      AccountLine,
    },
    data() {
      return {
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
            day: 12,
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
        ],
      };
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
        <tfoot></tfoot>
      </table>
    `,
  },
);

document.querySelector('#mainarea').innerHTML = '<account-table></account-table>';


new Vue({  // eslint-disable-line no-new
  el: '#mainarea',
});
