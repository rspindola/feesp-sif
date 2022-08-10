export const state = () => ({
  loading: false,
  groups: [],
  group: {},
  permissions: ['Ler', 'Editar', 'Exibir', 'Desabilitado'],
})

export const getters = {
  getterValue: (state) => {
    return state.value
  },
}

export const mutations = {
  setLoading(state, val) {
    state.loading = val
  },

  set(state, group) {
    state.groups = group
  },
}

export const actions = {
  async get({ commit }) {
    commit('setLoading', true)
    await this.$axios
      .$get('auth/groups', {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .then((response) => {
        const { groups } = response
        commit('set', groups)
        commit('setLoading', false)
      })
  },

  // create new group
  async create(_, data) {
    await this.$axios
      .$post('auth/groups', data, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch((e) => {
        throw Object.assign(new Error('Erro ao criar grupo'), {
          code: 400,
        })
      })
  },
}
