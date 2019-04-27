<template>
  <div class="dialog" />
  <!-- pre>
    {
      year: {{ year }},
      day: {{ day }},
      month: {{ month }},
      estimate: {{ estimate }},
      real: {{ real }},
      description: {{ description }},
      status: {{ status }},
    }
  </pre -->
</template>

<script>
export default {
  props: {
    day: {
      type: Number,
      required: false,
      default: 0,
    },
    month: {
      type: Number,
      required: false,
      default: 0,
    },
    year: {
      type: Number,
      required: false,
      default: 0,
    },
    estimate: {
      type: Number,
      required: false,
      default: 0,
    },
    real: {
      type: Number,
      required: false,
      default: 0,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    status: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped>
</style>
