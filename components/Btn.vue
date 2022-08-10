<template>
  <button class="my-btn">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
}
</script>

<style lang="scss">
@import '@/assets/scss/_mixins';

.my-btn {
  width: 10rem;
  height: 3rem;
  border-radius: 10px;
  background: black;
  color: white;
  @include bold-text;
  padding: 1rem;
  margin: 1rem auto;
}
</style>
