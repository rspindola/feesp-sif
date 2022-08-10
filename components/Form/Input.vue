<template>
  <div class="flex flex-col">
    <label :for="name">{{ label }}</label>
    <input
      :value="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      class="focus:outline-none focus:ring-1 focus:ring-blue-600"
    />
    <span v-if="helper" class="helper">{{ helper }}</span>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    helper: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/mixins.scss';

input {
  /* Auto Layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 8px;

  /* White */

  background: #ffffff;
  /* Greyish light */

  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  border-radius: 8px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 4px 0px;
}

@include placeholder {
  /* Body/Regular */

  font-family: Avenir;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  /* Greyish dark */

  color: #94a3b8;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 1;
  margin: 0px 10px;
}
</style>
