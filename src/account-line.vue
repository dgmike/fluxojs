<template>
  <tr>
    <td>{{ theDay }}</td>
    <td>{{ description }}</td>
    <td
      :class="{ negative: estimate < 0 }"
      class="text-center"
    >
      {{ theEstimate }}
    </td>
    <td
      :class="{ negative: real < 0 }"
      class="text-center"
    >
      {{ theReal }}
    </td>
    <td class="text-center">
      {{ theState }}
    </td>
    <td class="text-center">
      <a
        class="btn default"
        href="#"
      >Editar</a>
      <a
        class="btn danger"
        href="#"
      >Remover</a>
    </td>
  </tr>
</template>

<script>
// const numeral = require('numeral');
import numeral from 'numeral';

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
      type: String,
    },
  },
  computed: {
    theDay() {
      if (this.day < 10) {
        return `0${this.day}`;
      }
      return this.day;
    },
    theState() {
      return this.status === 'commited' ? 'Já aconteceu' : 'Ainda não aconteceu';
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
  cursor: default;
}

tr:hover {
  background: #ffffcc;
}

.negative {
  color: #ff8888;
}

.btn {
  display: inline-block;
  padding: 3px 5px;
  background: #eeeeee;
  border: 0;
  color: #333333;
  text-decoration: none;
  font-size: .75rem;
  border-radius: 3px;
}

.btn.default {
  background: #ffffff;
  color: #333333;
  border: 1px solid #eeeeee;
}

.btn.default:hover, .btn.default:focus {
  background: #f5f5f5;
}

.btn.danger {
  background: #ff7777;
  color: #ffffff;
  border: 1px solid #ff1111;
}

.btn.danger:hover, .btn.danger:focus {
  background: #ff4444;
}
</style>
