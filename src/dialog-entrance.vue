<template>
  <div>
    <div
      class="backdrop"
      @click="close"
    />
    <div class="dialog-wrapper">
      <div class="title">
        <div
          v-if="title"
          class="title-content"
        >
          {{ title }}
        </div>
        <div
          class="close"
          @click="close"
        >
          &times;
        </div>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
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
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #000;
  background-color: rgba(0, 0, 0, .7);
}

.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 30px auto;
  padding: 0;
  max-width: 600px;
  border-radius: 3px;
  overflow: hidden;

  background-color: #fff;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, .6);
}

.title {
  position: relative;
  padding: .5rem .8rem;
  margin: 0;
  background: #f5f5f5;
  background: linear-gradient(to bottom, #f3f3f3, #e5e5e5);
  box-shadow: 0 0 2px 0 #000;
  font-weight: bold;
  text-shadow: 1px 1px 1px #fff;
}

.close {
  user-select: none;
  box-sizing: border-box;
  position: absolute;
  right: .3rem;
  font-size: 1.2rem;
  top: 50%;
  margin-top: -.75rem;
  line-height: 1.3rem;
  text-align: center;
  height: 1.5rem;
  width: 1.5rem;
  padding: 0;
  text-shadow: 1px 1px 1px #fff;
  cursor: pointer;
}

.content {
  margin: 1rem;
  padding: 0;
  box-sizing: border-box;
}
</style>
