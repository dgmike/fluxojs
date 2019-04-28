<script>
import InputField from './input-field.vue';
import Select from './select.vue';
import Btn from './btn.vue';

export default {
  components: {
    InputField,
    Select,
    Btn,
  },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    saving: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    save() {
      this.$emit('save', Object.assign({}, this.$props.value));
    },
  },
};
</script>

<template>
  <div>
    <input
      v-model="value.id"
      type="hidden"
    >
    <input
      v-model="value.month"
      type="hidden"
    >
    <input
      v-model="value.day"
      type="hidden"
    >

    <div style="display:flex;align-items:baseline;justify-content:flex-end">
      <InputField
        id="form-day"
        v-model="value.day"
        label="Dia"
        type="number"
        min="1"
        :max="value.maxDay"
        step="1"
        style="width:100%"
      />

      <div>/</div>

      <InputField
        id="form-month"
        v-model="value.month"
        label="Mês"
        readonly
        type="number"
        min="1"
        max="12"
        step="1"
        style="width:100%"
      />

      <div>/</div>

      <InputField
        id="form-year"
        v-model="value.year"
        label="Ano"
        readonly
        type="number"
        min="1000"
        max="9999"
        step="1"
        style="width:100%"
      />
    </div>

    <div style="display:flex;align-items:baseline;align-content:stretch">
      <InputField
        id="form-valor-de-entrada"
        v-model="value.estimate"
        label="Valor estimado"
        type="number"
        step="any"
        max="999999999"
        min="-999999999"
        style="width:100%"
      />

      <InputField
        id="form-valor-real"
        v-model="value.real"
        label="Valor real"
        type="number"
        step="any"
        max="999999999"
        min="-999999999"
        style="width:100%"
      />

      <Select
        v-model="value.status"
      >
        <option value="uncommited">
          Ainda vai acontecer
        </option>
        <option value="commited">
          Já aconteceu
        </option>
      </Select>
    </div>

    <InputField
      id="form-description"
      v-model="value.description"
      label="Descrição"
      type="text"
      max-length="100"
    />

    <div
      style="display:flex;justify-content:flex-end;margin-top:1.5rem"
    >
      <Btn
        style="margin-right:.5rem"
        @click="$emit('close')"
      >
        Fechar formulário
      </Btn>

      <Btn
        class="primary"
        @click="save"
      >
        Salvar informações
      </Btn>
    </div>
  </div>
</template>
