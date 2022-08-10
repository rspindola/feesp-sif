export const state = () => ({
  loading: false,
  value: 'myvalue',
  turmas: [],
  turma: {},
  alunos: [],
  activePerson: null,
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

  updateValue: (state, payload) => {
    state.value = payload
  },

  setTurmas(state, turmas) {
    state.turmas = turmas
  },

  setTurma(state, turma) {
    state.turma = turma
  },

  setAlunos(state, val) {
    state.alunos = val
  },

  addClass(state, val) {
    state.turmas.push(val)
  },

  setActivePerson(state, person) {
    state.activePerson = person
  },
}

export const actions = {
  // CREATE CLASS
  async create({ commit }, data) {
    await this.$axios
      .$post('classes', data)
      .then((response) => {
        commit('addClass', data)
        return response
      })
      .catch((e) => {
        throw Object.assign(new Error('Erro ao cadastrar turma'), {
          code: 400,
        })
      })
  },

  // show class
  async show({ commit }, params) {
    commit('setLoading', true)
    await this.$axios
      .get(`/classes?id=${params.id}`, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .then((res) => {
        commit('setTurma', res.data.class)
        commit('setAlunos', res.data.class.registrations)
        commit('setLoading', false)
      })
  },

  // update class
  async updateClass(_, data) {
    await this.$axios
      .$put('classes?id=' + data.id, data, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch(() => {
        throw Object.assign(new Error('Erro ao atualizar turma'), {
          code: 400,
        })
      })
  },

  // delete class
  async deleteClass(_, id) {
    await this.$axios
      .$delete('classes?id=' + id, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch(() => {
        throw Object.assign(new Error('Erro ao deletar turma'), {
          code: 400,
        })
      })
  },

  // update registrations
  async update({ commit }, params) {
    await this.$axios
      .get(`/classes?id=${params.id}`, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .then((res) => {
        commit('setAlunos', res.data.class.registrations)
      })
  },

  // delete class
  async removeStudent(_, id) {
    await this.$axios
      .$delete('registrations?id=' + id, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch(() => {
        throw Object.assign(new Error('Erro ao deletar turma'), {
          code: 400,
        })
      })
  },
}
