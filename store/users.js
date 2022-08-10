export const state = () => ({
  loading: false,
  users: [],
  user: {},
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

  set(state, user) {
    state.users = user
  },

  addUser(state, user) {
    state.users.push(user)
  },
}

export const actions = {
  // create new user
  async createUser(_, data) {
    await this.$axios
      .$post('auth/signUp', data, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch((e) => {
        throw Object.assign(new Error(e), {
          code: e.response.status,
          message: e.response.data.message,
        })
      })
  },

  // get all users
  async get({ commit }) {
    commit('setLoading', true)
    await this.$axios
      .$get('auth/users', {
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

  // update user
  async updateUser(_, data) {
    await this.$axios
      .$put('auth/users?email=' + data.email, data, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch((e) => {
        throw Object.assign(new Error(e), {
          code: e.response.status,
          message: e.response.data.message,
        })
      })
  },

  // delete user
  async deleteUser(_, email) {
    await this.$axios
      .$delete('auth/users?email=' + email, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch((e) => {
        throw Object.assign(new Error(e), {
          code: e.response.status,
          message: e.response.data.message,
        })
      })
  },
}
