<template>
  <tr>
    <td>{{ theDay }}</td>
    <td>{{ description }}</td>
    <td class="text-center">{{ theEstimate }}</td>
    <td class="text-center">{{ theReal }}</td>
    <td class="text-center">{{ theState }}</td>
    <td class="text-center">
      <a href="#">Editar</a>
      <a href="#">Remover</a>
    </td>
  </tr>
</template>

<script>
const numeral = require('numeral');
require('numeral/locales/pt-br');

numeral.locale('pt-br');

module.exports = {
  props: {
    day: {
      type: Number,
    },
    description: {
      type: String,
    },
    estimate: {
      type: Number,
    },
    real: {
      type: Number,
    },
    status: {
      type: Boolean,
    },
  },
  computed: {
    theDay() {
      if (this.day < 10) {
        return '0' + this.day;
      }
      return this.day;
    },
    theState() {
      return this.status ? 'Já aconteceu' : 'Ainda não aconteceu';
    },
    theReal() {
      return this.real ? numeral(this.real).format('$ 0,0.00') : '-';
    },
    theEstimate() {
      return this.estimate ? numeral(this.estimate).format('$ 0,0.00') : '-';
    },
  },
};
</script>

<style scoped>
tr {
  cursor: pointer;
}

tr:hover {
  background: #ffffee;
}
</style>
