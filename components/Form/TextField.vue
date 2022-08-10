<template>
  <ValidationProvider v-slot="{ errors }" mode="passive" :rules="rules">
    <div class="flex flex-col">
      <label :for="name">{{ label }} </label>
      <textarea
        :value="value"
        :name="name"
        rows="5"
        :class="errors.length > 0 ? 'has-error' : ''"
        class="focus:outline-none focus:ring-1 focus:ring-blue-600"
      ></textarea>
      <span v-if="helper" class="helper">{{ helper }}</span>
      <!-- <span class="has-error">{{ errors[0] }}</span> -->
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
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
    rules: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/mixins.scss';

label {
  font-family: 'Avenir-Medium';
  font-size: 16px;
  color: #475569;
  margin: 4px 0px;
}

textarea {
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

.helper {
  /* Body small/Regular */

  font-family: Avenir;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  /* identical to box height, or 21px */

  /* Greyish dark */

  color: #94a3b8;

  /* Inside Auto Layout */

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  margin: 4px 0px;
}
</style>
