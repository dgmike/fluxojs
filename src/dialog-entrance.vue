<template>
  <div class="dialog"></div>
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
    day: Number,
    month: Number,
    year: Number,
    estimate: Number,
    real: Number,
    description: String,
    status: String,
  }
}
</script>

<style scoped>
</style>
