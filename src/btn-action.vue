<template>
  <button class="btn" type="button" @click="$emit('intent-to-add-entrance')">
    <div class="icon" v-html="icon"></div>
    <div class="read-only"><slot></slot></div>
  </button>
</template>

<script>
export default {
  props: {
    icon: String
  }
}
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
