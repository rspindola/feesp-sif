export const state = () => ({
  value: 'myvalue',
  loading: false,
})

export const getters = {
  getterValue: (state) => {
    return state.value
  },
}

export const mutations = {
  setLoading: (state, value) => {
    state.loading = value
  },

  updateValue: (state, payload) => {
    state.value = payload
  },
}

export const actions = {
  // create new registration
  async create(_, data) {
    await this.$axios
      .$post('registrations', data, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch((e) => {
        throw Object.assign(new Error('Erro ao tentar cadastrar matricula'), {
          code: 400,
        })
      })
  },

  // update registration
  async updateRegistration(_, data) {
    const { id, obs, result } = data
    await this.$axios
      .$put(
        'registrations?id=' + id,
        {
          obs,
          result,
        },
        {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
        }
      )
      .catch(() => {
        throw Object.assign(new Error('Erro ao atualizar turma'), {
          code: 400,
        })
      })
  },
}
