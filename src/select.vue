<style scoped>
select {
  background-color: transparent;
  width: 100%;
  padding: .5rem;
  border: 0;
  border-bottom: 2px solid #f2f2f2;
  height: 2.16rem;
}

select:focus {
  border-bottom: 2px solid #5ae;
  outline: 0;
}
</style>

<template>
  <select
    :value="value"
    @change="$emit('change', $event.target.value)"
  >
    <slot />
  </select>
</template>

<script>
export default {
  model: {
    event: 'change',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
};
</script>
