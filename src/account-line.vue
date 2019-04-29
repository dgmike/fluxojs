<style scoped>
tr {
  cursor: default;
}

tr:hover {
  background: #ffffcc;
}

td {
  border-left: 1px solid #e4e4e4;
}

td:first-of-type {
  border-left: 0;
}

.negative {
  color: #ff8888;
}

td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.state-symbol {
  display: inline;
}

.state-text {
  display: none;
}

@media screen and (min-width: 768px) {
  .state-symbol {
    display: none;
  }

  .state-text {
    display: inline;
  }
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

<template>
  <tr>
    <td
      class="text-center"
    >
      {{ theDay }}
    </td>
    <td
      class="description"
      :title="description"
    >
      {{ description }}
    </td>
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
      <span
        class="state-symbol"
        v-html="stateSymbol"
      />
      <span class="state-text">
        {{ theState }}
      </span>
    </td>
    <td class="text-center">
      <a
        class="btn default"
        href="#"
      >
        Editar
      </a>
      <a
        class="btn danger"
        href="#"
      >
        Remover
      </a>
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
    stateSymbol() {
      return this.status === 'commited' ? '&#10004;' : '&#10005;';
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
