export const state = () => ({
  sidebarOpen: false,
  menu: [
    {
      name: 'Cadastro Único',
      to: 'cadastro-unico',
    },
    {
      name: 'Voluntariado',
      to: 'voluntario',
    },
    {
      name: 'Assistência Espiritual',
      to: 'assitencia-espiritual',
    },
    {
      name: 'Assistência Social',
      to: 'assistencia-social',
    },
    {
      name: 'Divulgação',
      to: 'divulgacao',
    },
    {
      name: 'Ensino',
      to: 'ensino',
    },
    {
      name: 'Federativa',
      to: 'federativa',
    },
    {
      name: 'Doutrinária',
      to: 'doutrinaria',
    },
    {
      name: 'Infância. Juventude e Mocidade',
      to: 'infancia-juventude-mocidade',
    },
    {
      name: 'Institucional',
      to: 'institucional',
    },
  ],
  tabs: [],
  userLogged: {},
})

export const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebarOpen = !state.sidebarOpen
  },
  SET_TABS(state, tabs) {
    state.tabs = tabs
  },
  SET_USER_LOGGED(state, user) {
    state.userLogged = user
  },
}

export const actions = {
  toggleSidebar(context) {
    context.commit('TOGGLE_SIDEBAR')
  },
}

export const getters = {
  sidebarOpen: (state) => state.sidebarOpen,
}
