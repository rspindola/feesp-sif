<!-- CustomTextarea.vue -->
<template>
  <ValidationProvider v-slot="{ errors }" mode="passive" :rules="rules">
    <div class="flex flex-col">
      <label :for="name">{{ label }}</label>
      <textarea
        :name="name"
        rows="5"
        :class="errors.length > 0 ? 'has-error' : ''"
        class="focus:outline-none focus:ring-1 focus:ring-blue-600"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="value"
        @input="onInput"
        @change="onChange"
      ></textarea>
      <!-- <span class="has-error">{{ errors[0] }}</span> -->
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'CustomTextarea',
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    rules: {
      type: String,
      required: false,
      default: '',
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
      return this.label.toLowerCase()
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
