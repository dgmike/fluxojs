<template>
  <button
    class="btn"
    type="button"
    @click="$emit('intent-to-add-entrance')"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="icon"
      v-html="sanitizedIcon"
    />
    <!-- eslint-enable vue/no-v-html -->
    <div class="read-only">
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
      validator(value) {
        return value.match(/^[a-z0-9_]+$/);
      },
    },
  },
  computed: {
    sanitizedIcon() {
      return `&${this.icon};`;
    },
  },
};
</script>

<style scoped>
.btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border-width: 0;
  background-color: rgba(0, 0, 200, 0.8);
  color: #ffffff;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
  cursor: pointer;
  outline: 0;
  transition: .3s background-color;
}

.btn:hover {
  background-color: #0000aa;
}

.icon {
  font-size: 1.7rem;
  line-height: 100%;
}

.read-only {
  position: absolute;
  top: -999rem;
  left: -999rem;
}
</style>
