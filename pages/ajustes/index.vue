<template>
  <div></div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'SettingsPage',
  layout: 'admin',
  middleware: 'role',
  data() {
    return {
      tabs: [
        {
          label: 'Usuários',
          route: 'ajustes-usuarios',
        },
        {
          label: 'Grupos',
          route: 'ajustes-grupos',
        },
      ],
    }
  },
  beforeMount() {
    this.$store.commit('drawer/SET_TABS', this.tabs)
  },
})
</script>
