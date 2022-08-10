<template>
  <button :class="classType" class="hover:bg-primary-light">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'OutlineButton',
  props: {
    label: {
      type: String,
      default: '',
    },
    classType: {
      type: String,
      default: '',
      required: false,
    },
  },
}
</script>

<style scoped lang="scss">
button {
  background: #ffffff;
  /* Primary dark */

  border: 1px solid #2867a1;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 23.5px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #2867a1;

  &:hover {
    color: #fff;
  }
}
</style>
