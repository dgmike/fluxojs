<style scoped>
th {
  padding: .3rem .5rem;
  border-bottom: 2px solid #e4e4e4;
  border-left: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
  background: #fafafa;
  background: linear-gradient(to bottom, #f5f5f5, #fafafa);
}

th:first-child {
  border-left: 0;
}
</style>

<template>
  <tbody>
    <tr>
      <th
        class="subhead"
        colspan="6"
      >
        {{ title }}
      </th>
    </tr>
    <slot />
  </tbody>
</template>

<script>
module.exports = {
  data() {
    return {
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
