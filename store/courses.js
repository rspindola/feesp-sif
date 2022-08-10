import merge from 'lodash.merge'

export const state = () => ({
  loading: false,
  places: [
    'FEESP (Sede)',
    'Casa Transitória (Sede)',
    'FEESP (Virtual)',
    'Casa Transitória (Virtual)',
  ],
  days: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  courses: [],
  course: {},
  turmas: [],
})

export const mutations = {
  setLoading(state, val) {
    state.loading = val
  },

  set(state, courses) {
    state.courses = courses
  },

  async add(state, value) {
    await state.courses.push(value)
  },

  addClass(state, value) {
    state.turmas.push(value)
  },

  mergeCourse(state, form) {
    merge(state.course, form)
  },

  setCourse(state, course) {
    state.course = course
  },

  setTurmas(state, classes) {
    state.turmas = classes
  },
}

export const actions = {
  async get({ commit }) {
    commit('setLoading', true)
    const token = this.$auth.strategy.token.get()
    await this.$axios
      .$get('courses', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { courses } = response
        commit('set', courses)
        commit('setLoading', false)
      })
  },

  // create course
  async createCourse({ commit }, data) {
    await this.$axios
      .$post('courses', data)
      .then((response) => {
        commit('add', data)
        return response
      })
      .catch(() => {
        throw Object.assign(new Error('Erro ao cadastrar curso'), {
          code: 400,
        })
      })
  },

  // create class
  async createClass({ commit }, data) {
    await this.$axios
      .$post('classes', data)
      .then((response) => {
        commit('addClass', data)
        return response
      })
      .catch(() => {
        throw Object.assign(new Error('Erro ao cadastrar turma'), {
          code: 400,
        })
      })
  },

  // show course
  async show({ commit }, params) {
    commit('setLoading', true)
    await this.$axios
      .get(`/courses?id=${params.id}`, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .then((res) => {
        commit('setCourse', res.data.course)
        commit('classes/setTurmas', res.data.course.classes, { root: true })
        commit('setLoading', false)
      })
  },

  // update course
  async updateCourse(_, data) {
    await this.$axios
      .$put('courses?id=' + data.id, data, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch(() => {
        throw Object.assign(new Error('Erro ao alterar curso'), {
          code: 400,
        })
      })
  },

  // delete course
  async deleteCourse(_, id) {
    await this.$axios
      .$delete('courses?id=' + id, {
        headers: {
          Authorization: this.$auth.strategy.token.get(),
        },
      })
      .catch(() => {
        throw Object.assign(new Error('Erro ao excluir curso'), {
          code: 400,
        })
      })
  },
}

export const getters = {
  allCourses: (state) => state.courses,
  allClasses: (state) => state.turmas,
}
