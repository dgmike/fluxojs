const vue = require('vue');

const Vue = vue.default;

Vue.component(
  'account-table',
  {
    data: () => {
      return {};
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
        </tfoot>
      </table>
    `,
  }
);

document.querySelector('#mainarea').innerHTML = '<account-table></account-table>';

const main = new Vue({
  el: '#mainarea'
});
