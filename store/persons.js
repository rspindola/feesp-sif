// STORE DO CADASTRO UNICO

import merge from 'lodash.merge'
import assign from 'lodash.assign'

export const state = () => ({
  loading: false,
  persons: [],
  person: {},
  options: {
    haveChildren: ['Sim', 'Não'],
    maritialStatus: ['Solteiro', 'Casado', 'Divorciado', 'Viuvo', 'Outro'],
    gender: ['Masculino', 'Feminino', 'Outro'],
    addressType: ['Casa', 'Trabalho', 'Outro'],
    graduationLevel: [
      'Fundamental - Incompleto',
      'Fundamental - Completo',
      'Médio - Incompleto',
      'Médio - Completo',
      'Superior - Incompleto',
      'Superior - Completo',
      'Mestrado - Incompleto',
      'Mestrado - Completo',
      'Doutorado - Incompleto',
      'Doutorado - Completo',
    ],
  },
})

export const mutations = {
  setLoading(state, val) {
    state.loading = val
  },

  set(state, person) {
    state.persons = person
  },

  add(state, value) {
    merge(state.persons, value)
  },

  mergePersons(state, form) {
    assign(state.person, form)
  },

  remove(state, { car }) {
    state.persons = state.list.filter((c) => car.id !== c.id)
  },

  setCars(state, form) {
    state.person = form
  },
}

export const actions = {
  // get all persons
  async get({ commit }) {
    commit('setLoading', true)
    await this.$axios
      .$get('users', {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .then((response) => {
        const { users } = response
        commit('set', users)
        commit('setLoading', false)
      })
  },

  // get person by id
  async show({ commit }, params) {
    commit('setLoading', true)
    await this.$axios
      .$get(`/users?id=${params.id}`, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .then((res) => {
        commit('mergePersons', res.user)
        commit('setLoading', false)
        return res
      })
  },

  // create new person
  async create(_, data) {
    await this.$axios
      .$post('users', data, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .then((response) => {
        this.$router.push({ name: 'cadastro-unico' })
      })
      .catch((e) => {
        throw Object.assign(new Error(e), {
          code: 400,
          message: e.response.data.message,
        })
      })
  },

  async update({ commit }, data) {
    commit('setLoading', true)

    await this.$axios
      .$put(`/users?id=${data.id}`, data, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .then((res) => {
        commit('mergePersons', res.user)
        commit('setLoading', false)

        return 1
      })
      .catch(() => {
        commit('setLoading', false)
        throw Object.assign(new Error('Erro ao alterar usuário'), {
          code: 400,
        })
      })
  },

  async delete(_, id) {
    await this.$axios
      .$delete('users?id=' + id, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch(() => {
        throw Object.assign(new Error('Erro ao excluir usuário'), {
          code: 400,
        })
      })
  },
}

export const getters = {
  allPersons: (state) => state.persons,
  getPerson: (state) => state.person,
}
