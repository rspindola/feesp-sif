<template>
  <div>
    <div>
      <h3>Novo Cadastro</h3>
      <ul class="breadcrumb">
        <li>
          <nuxt-link :to="{ name: 'cadastro-unico' }">
            Cadastro único</nuxt-link
          >
        </li>
        <li>
          <nuxt-link :to="{ name: 'cadastro-unico' }">
            Pessoas cadastradas
          </nuxt-link>
        </li>
        <li>Novo cadastro</li>
      </ul>
    </div>
    <div class="main">
      <cadastro-form />
    </div>
  </div>
</template>

<script>
import CadastroForm from '~/components/Pages/CadastroForm.vue'

export default {
  name: 'DetailsCadastro',
  components: {
    CadastroForm,
  },
  layout: 'admin',
  fetch({ store }) {
    store.commit('persons/setCars', {})
  },
}
</script>

<style lang="scss" scoped>
.main {
  background: #ffffff;
  padding: 29px 32px;

  .title {
    font-family: Avenir;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;

    /* Primary */

    color: #508ec7;
    margin-bottom: 24px;
  }

  .label {
    /* Body/Regular */

    font-family: Avenir;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    /* Greyish dark */

    color: #94a3b8;
  }
}
</style>
