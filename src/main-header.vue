<template>
  <header>
    <h1>FluxoJs</h1>
    <nav v-if="date">
      <a
        href="#"
        @click.prevent="prevMonth"
      >&larr;</a>
      <vue-monthly-picker
        :value="date"
        :month-labels="locale"
        input-class="label"
        date-format="MMM/YYYY"
        @selected="dateSelected"
      />
      <a
        href="#"
        @click.prevent="nextMonth"
      >&rarr;</a>
    </nav>
    <nav
      v-else
      class="loading"
    >
      Carregando...
    </nav>
    <nav>
      <!-- <a href="#">Clonar</a> -->
      <!-- <a href="#">Configurar</a> -->
      <a href="/logout">Sair</a>
    </nav>
  </header>
</template>

<script>
import VueMonthlyPicker from 'vue-monthly-picker';
import 'moment/locale/pt-br';
import moment from 'moment';

// const moment = require('moment');

moment.locale('pt-BR');

window.m = moment;

module.exports = {
  components: {
    VueMonthlyPicker,
  },
  props: {
    date: {
      type: moment,
    },
  },
  computed: {
    month() {
      return this.date && this.date.format('MMMM/YYYY');
    },
  },
  data() {
    return {
      locale: moment.monthsShort(),
    };
  },
  methods: {
    prevMonth() {
      const newDate = this.date.clone().subtract(1, 'month');
      this.$emit('update-month', newDate);
    },
    nextMonth() {
      const newDate = this.date.clone().add(1, 'month');
      this.$emit('update-month', newDate);
    },
    dateSelected(date) {
      this.$emit('update-month', date);
    },
  },
};
</script>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 5px 0 rgba(20, 20, 20, .5);
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#fafafa+0,eeeeee+100;Grey+Blue+3D */
    background: #f8f8f8; /* Old browsers */
    background: -moz-linear-gradient(top, #fafafa 0%, #eeeeee 100%); /* FF3.6-15 */
    background: -webkit-gradient(  /* Chrome,Safari4+ */
      linear,
      left top,
      left bottom,
      color-stop(0%, #fafafa),
      color-stop(100%, #eeeeee)
    );
    background: -webkit-linear-gradient(top, #fafafa 0%,#eeeeee 100%); /* Chrome10-25,Safari5.1-6 */
    background: -o-linear-gradient(top, #fafafa 0%, #eeeeee 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(top, #fafafa 0%, #eeeeee 100%); /* IE10+ */
    background: linear-gradient( /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      to bottom,
      #fafafa 0%,
      #eeeeee 100%
    );
}

header nav {
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
}

header nav > a,
header nav > div {
    padding: 15px;
    text-decoration: none;
    color: #333;
    display: inline-block;
    border-left: 1px solid #fff;
    border-right: 1px solid #ddd;
    text-align: center;
}

header nav a:hover {
    text-shadow: 0 0 2px #ccc;
    padding-top: 16px;
    padding-bottom: 14px;
}

header nav a:first-of-type {
    border-left: 0;
}

header nav a:last-of-type {
    border-right: 0;
}

header nav .currentmonth {
    min-width: 5rem;
}

.loading {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    opacity: .5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .5;
  }
}
</style>

<style>
header .date-popover.visible {
  top: calc(100% + 1rem);
}
</style>
