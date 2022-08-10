<template>
  <div></div>
</template>

<script>
export default {
  name: 'CadastroUnico',
  layout: 'admin',
  middleware: 'role',
  data() {
    return {
      tabs: [
        {
          label: 'Cursos',
          route: 'ensino-cursos',
        },
        {
          label: 'Matrícula',
          route: 'ensino-matricula',
        },
      ],
    }
  },
  beforeMount() {
    this.$store.commit('drawer/SET_TABS', this.tabs)
  },
}
</script>
