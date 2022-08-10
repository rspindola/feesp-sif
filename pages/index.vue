<template>
  <div></div>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'admin',
  data() {
    return {
      tabs: [],
    }
  },
  mounted() {
    this.$store.commit('drawer/SET_TABS', this.tabs)
  },
}
</script>
