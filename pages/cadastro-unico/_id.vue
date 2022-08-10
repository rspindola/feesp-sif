<template>
  <div>
    <page-loading v-if="loading" />
    <div v-else>
      <div>
        <h3>Pessoas cadastradas</h3>
        <ul class="breadcrumb">
          <li>Cadastro único</li>
          <li>
            <nuxt-link to="/cadastro-unico"> Pessoas cadastradas </nuxt-link>
          </li>
          <li>{{ user.name }}</li>
        </ul>
      </div>
      <edit-form :details-user="user" :permission="{ perm }" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageLoading from '~/components/Pages/PageLoading.vue'
import EditForm from '~/components/Pages/EditForm.vue'

export default {
  name: 'DetailsCadastro',
  components: { PageLoading, EditForm },
  layout: 'admin',
  async asyncData({ $auth, route, params, $axios, $moment }) {
    const firstPath = route.path.split('/')[1].replace('-', '')
    let user = null

    const res = await $auth.user.UserAttributes.Permissions.filter((item) => {
      return firstPath
        .toLowerCase()
        .split(' ')
        .every((v) => item.name.toLowerCase().includes(v))
    })

    const perm = res[0].permission

    await $axios
      .$get(`/users?id=${params.id}`, {
        headers: {
          Authorization: $auth.strategy.token.get(),
        },
      })
      .then((res) => {
        user = res.user
        return res
      })

    return { perm, user }
  },
  data() {
    return {
      tabs: [
        {
          label: 'Voltar',
          route: 'ensino-cursos',
        },
      ],
    }
  },
  computed: {
    ...mapState('persons', ['loading']),
  },
}
</script>

<style lang="scss" scoped>
.main {
  background: #ffffff;
  padding: 29px 32px;
  font-family: 'Avenir-Roman';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;

  .title {
    color: #508ec7;
    margin-top: 40px;
  }

  .label {
    color: #94a3b8;
    white-space: nowrap;
  }

  .muted {
    color: #475569;
  }
}

.editButton {
  border-radius: 8px;
  height: 48px;
  margin: 4px 0px;
}

table {
  th {
    font-family: 'Avenir-Heavy';
    font-size: 16px;
    line-height: 150%;
    padding: 16px 12px;
  }
  td {
    padding: 16px 12px;
    font-family: 'Avenir-Roman';
    font-size: 16px;
    line-height: 150%;
    color: #475569;
  }
}

.b-red {
  border: 1px solid red;
  color: red;

  &:hover {
    background: rgba(255, 0, 0, 0.644);
    color: white;
  }
}
</style>
