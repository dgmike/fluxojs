<template>
  <table aria-label="Dados de fluxo de entradas e saidas">
    <thead>
      <th scope="col">
        Dia
      </th>
      <th scope="col">
        Descrição
      </th>
      <th scope="col">
        Estimativa
      </th>
      <th scope="col">
        Valor Real
      </th>
      <th scope="col">
        Estado
      </th>
      <th scope="col">
        Ações
      </th>
    </thead>
    <tfoot>
      <tr>
        <th
          colspan="2"
          scope="row"
        >
          Total
        </th>
        <th
          id="row-total-estimate"
          :class="{ negative: totals.estimateValue < 0 }"
        >
          {{ totals.estimate }}
        </th>
        <th
          id="row-total-real"
          :class="{ negative: totals.realValue < 0 }"
        >
          {{ totals.real }}
        </th>
        <th
          id="row-total-extra-spaces"
          colspan="3"
        />
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
</template>

<script>
import numeral from 'numeral';
import AccountLines from './account-lines.vue';
import AccountLine from './account-line.vue';

require('numeral/locales/pt-br');

numeral.locale('pt-br');

export default {
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
  computed: {
    totals() {
      const estimateEntrances = this.$props.entrances
        .map((e) => e.estimate || 0)
        .reduce((a, b) => b + a, 0);

      const estimateOutputs = this.$props.outputs
        .map((e) => e.estimate || 0)
        .reduce((a, b) => b + a, 0);

      const estimateValue = estimateEntrances + estimateOutputs;

      const realEntrances = this.$props.entrances
        .map((e) => e.real || 0)
        .reduce((a, b) => b + a, 0);

      const realOutputs = this.$props.outputs
        .map((e) => e.real || 0)
        .reduce((a, b) => b + a, 0);

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

<style scoped>
.negative {
  color: #ff8888;
}
</style>
