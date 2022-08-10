export default {
  server: {
    port: 8000,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SIF - Federação Espírita do Estado de São Paulo',
    htmlAttrs: {
      lang: 'pt-br',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: '~/plugins/vue-mask' },
    { src: '~/plugins/vee-validate' },
    '~/plugins/axios',
    '~/plugins/vue-select',
    '~/plugins/via-cep',
    '~/plugins/sweet-alert',
    '~/plugins/vue-avatar',
    '~/plugins/vue-hotjar',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://www.npmjs.com/package/@nuxtjs/moment
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/madmod/nuxt-vue-select
    'nuxt-vue-select',
    // https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
  ],

  dotenv: {
    /* module options */
  },

  toast: {
    position: 'top-center',
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
        },
      },
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://kj0bzywgkg.execute-api.us-east-2.amazonaws.com/dev',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          type: false,
          maxAge: 1800,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        endpoints: {
          login: {
            url: '/auth/signIn',
            method: 'post',
            propertyName: false,
          },
          logout: false,
          refresh: { url: '/auth/refreshToken', method: 'post' },

          user: {
            url: '/auth/me',
            method: 'get',
          },
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/',
    },
    // cookie: false,
    token: {
      prefix: 'token',
    },
  },

  moment: {
    defaultLocale: 'pt-br',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
  },
}
