<template>
  <div class="flex flex-col">
    <label :for="name">{{ label }}</label>
    <v-select :options="options" label="title">
      <template slot="option" slot-scope="option">
        {{ option.title }}
      </template>
    </v-select>
    <span v-if="helper" class="helper">{{ helper }}</span>
  </div>
</template>

<script>
export default {
  name: 'InputSelectOption',
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
    options: {
      type: Array,
      default: null,
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

select {
  font-family: 'Avenir-Roman';
  color: #475569;
  display: flex;
  flex-direction: row;
  padding: 12px 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  border-radius: 8px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 4px 0px;
}

@include placeholder {
  font-family: Avenir;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: #94a3b8;
  flex: none;
  order: 0;
  flex-grow: 1;
  margin: 0px 10px;
}

.helper {
  font-family: Avenir;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: #94a3b8;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  margin: 4px 0px;
}
</style>
