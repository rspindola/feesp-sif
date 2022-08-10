<template>
  <button class="hover:bg-primary-light">
    {{ textLabel }}
  </button>
</template>

<script>
export default {
  name: 'ButtonLogin',
  props: {
    textLabel: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
button {
  color: #ffffff;
  background: linear-gradient(6.03deg, #00489c 0%, #1d578d 100%);
  border-radius: 8px;
  height: 48px;
  margin: 4px 0px;
}
</style>
