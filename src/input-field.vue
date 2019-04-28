<style scoped>
.input-group {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding: .5rem;
  margin: 0;
  position: relative;
}

.input-control {
  box-sizing: border-box;
  width: 100%;
  padding: 1rem .5rem .5rem;
  border: 0;
  border-bottom: 2px solid #f2f2f2;
  outline: 0;
  margin: .5rem 0 0;
  background: transparent;
}

.input-label {
  color: #bbb;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  transition: bottom .5s, font-size .5s, color .5s;
  cursor: text;
}

.input-control:focus {
  border-bottom-color: #5ae;
}

.input-control:focus ~ label,
.input-control.not-empty ~ label {
  bottom: 2.5rem;
  font-size: .7rem;
  color: #5ae;
}

.input-control:invalid {
  border-bottom-color: #f00;
}

.input-control:invalid ~ label {
  color: #f00;
}

.max-length {
  position: absolute;
  right: .5rem;
  bottom: -.5rem;
  font-size: .7rem;
}

.max-length.warning {
  color: #d60;
}
</style>

<template>
  <div>
    <div class="input-group">
      <input
        :id="id"
        :class="{ 'input-control': true, 'not-empty': !!value }"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :type="type"
        :max="max"
        :min="min"
        :pattern="pattern"
        :step="step"
        :value="value"
        :maxlength="maxLength"
        :name="name"
        @input="$emit('input', $event.target.value)"
      >
      <label
        class="input-label"
        :for="id"
      >
        {{ label }} <sup v-if="required">*</sup>
      </label>
      <div
        v-if="maxLength"
        :class="{ 'max-length': true, warning: maxLength >= 50 && remainderLength <= 20 }"
      >
        {{ value.length }} / {{ maxLength }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    min: {
      type: String,
      default: null,
    },
    max: {
      type: String,
      default: null,
    },
    step: {
      type: String,
      default: null,
    },
    pattern: {
      type: String,
      default: null,
    },
    maxLength: {
      type: String,
      default: null,
    },
  },
  computed: {
    remainderLength() {
      return this.maxLength - this.value.length;
    },
  },
};
</script>
