<!-- CustomInput.vue -->
<template>
  <span>
    <label v-if="label" :for="name">{{ label }}</label>
    <ValidationProvider v-slot="{ errors }" mode="passive" :rules="rules">
      <input
        :id="id"
        :type="type"
        :name="name"
        :value="value"
        :class="errors.length > 0 ? 'has-error' : ''"
        class="focus:outline-none focus:ring-1 focus:ring-blue-600 w-full"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :maxlength="max"
        :minlength="min"
        @input="onInput"
        @change="onChange"
      />
      <span v-if="hasMessage && errors.length > 0" class="has-error">
        {{ errors[0] }}
      </span>
    </ValidationProvider>
  </span>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: Number,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    readonly: {
      type: Boolean,
      required: false,
    },
    rules: {
      type: String,
      required: false,
      default: '',
    },
    hasMessage: {
      type: Boolean,
      required: false,
      default: false,
    },
    max: {
      type: String,
      required: false,
    },
    min: {
      type: Number,
      required: false,
    },
  },
  /* Can add validation here
  watch: {
    value: {
      handler(newValue, oldValue) {

      },
    },
  }, */
  computed: {
    name() {
      if (this.label) {
        return this.label.toLowerCase()
      }

      return 0
    },
  },
  methods: {
    onInput(event) {
      // Can add validation here
      this.$emit('input', event.target.value)
    },
    onChange(event) {
      // Supports .lazy
      // Can add validation here
      this.$emit('change', event.target.value)
    },
  },
}
</script>
