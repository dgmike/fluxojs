<style scoped>
.btn {
  display: inline-block;
  padding: 7px 10px;
  background: #eee;
  border: 0;
  color: #333333;
  text-decoration: none;
  font-size: .75rem;
  border-radius: 3px;
}

.btn:hover, .btn:focus {
  background: #ddd;
}

.btn.primary {
  background: #38c;
  background: linear-gradient(to bottom, #38c, #16a);
  color: #fff;
  font-weight: bold;
  border: 1px solid #eeeeee;
  transform: background 1s;
}

.btn.primary:hover, .btn.primary:focus {
  background: #49d;
  background: linear-gradient(to bottom, #49d, #27b);
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
  <button
    class="btn"
    @click="$emit('click', $event.target)"
  >
    <slot />
  </button>
</template>

<script>
export default {
};
</script>
