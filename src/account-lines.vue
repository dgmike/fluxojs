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
