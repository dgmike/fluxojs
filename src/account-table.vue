<style scoped>
table {
  max-width: 992px;
  margin: 2rem auto 0;

  table-layout: fixed;
  white-space: nowrap;
}

thead th:nth-child(1) {
  width: 2rem;
}

thead th:nth-child(2) {
  width: 8rem;
}

@media screen and (min-width: 570px) {
  thead th:nth-child(2) {
    width: 40%;
  }
}

thead th:nth-child(3) {
  width: 5rem;
}

thead th:nth-child(4) {
  width: 5rem;
}

thead th:nth-child(5) {
  width: 2rem;
}

thead th:nth-child(6) {
  width: 7rem;
}

@media screen and (min-width: 768px) {
  thead th:nth-child(1) {
    width: 6%;
  }

  thead th:nth-child(2) {
    width: 40%;
  }

  thead th:nth-child(3) {
    width: 12%;
  }

  thead th:nth-child(4) {
    width: 12%;
  }

  thead th:nth-child(5) {
    width: 15%;
  }

  thead th:nth-child(6) {
    width: 16%;
  }
}

th, td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

th {
  padding: .3rem .5rem;
  border-bottom: 2px solid #e4e4e4;
  border-left: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
  background: #fafafa;
  background: linear-gradient(to bottom, #f5f5f5, #fafafa);
}

th:first-of-type {
  border-left: 0;
}

.floating-table {
  position: fixed;
  top: 17px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 4px 2px rgba(0,0,0,.1);
}
.floating-table th {
  border-top: 1px solid #ccc !important;
}
</style>

<template>
  <div>
    <table
      v-if="floatingTable"
      class="floating-table"
    >
      <thead>
        <th>Dia</th>
        <th>Descrição</th>
        <th>Estimativa</th>
        <th>Valor Real</th>
        <th>Estado</th>
        <th>Ações</th>
      </thead>
    </table>

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
          <th colspan="2">
            Total
          </th>
          <th :class="{ negative: totals.estimateValue < 0 }">
            {{ totals.estimate }}
          </th>
          <th :class="{ negative: totals.realValue < 0 }">
            {{ totals.real }}
          </th>
          <th colspan="2" />
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
        />
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
        />
      </account-lines>
    </table>
  </div>
</template>

<script>
import numeral from 'numeral';
import AccountLines from './account-lines.vue';
import AccountLine from './account-line.vue';

// const numeral = require('numeral');
require('numeral/locales/pt-br');
// import 'numeral/locales/pt-br';

numeral.locale('pt-br');

module.exports = {
  components: {
    AccountLines,
    AccountLine,
  },
  props: {
    entrances: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    outputs: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      floatingTable: false,
    };
  },
  mounted() {
    const self = this;

    setInterval(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      self.updateFloatingTable(scrollTop > 22);
    }, 5);
  },
  methods: {
    updateFloatingTable(value) {
      this.$set(this.$data, 'floatingTable', value);
    },
  },
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
};
</script>
