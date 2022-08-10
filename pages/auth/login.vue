<template>
  <div class="login flex items-center justify-center min-h-screen bg-white">
    <div class="px-8 py-6 mt-4 text-left w-10/12 md:w-6/12 lg:w-4/12">
      <div class="flex justify-center">
        <img class="object-center" src="@/static/images/logo.png" alt="Logo" />
      </div>
      <ValidationObserver ref="form">
        <form @submit.prevent="userLogin">
          <div class="mt-4">
            <ValidationProvider
              v-slot="{ errors }"
              mode="passive"
              rules="required"
            >
              <div class="flex flex-col">
                <input
                  v-model="login.email"
                  type="text"
                  name="e-mail"
                  :class="errors.length > 0 ? 'has-error' : ''"
                  class="focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="E-mail"
                />
              </div>
            </ValidationProvider>
            <div class="mt-4">
              <ValidationProvider
                v-slot="{ errors }"
                mode="passive"
                rules="required"
              >
                <div class="flex flex-col">
                  <input
                    v-model="login.password"
                    type="password"
                    name="password"
                    :class="errors.length > 0 ? 'has-error' : ''"
                    class="focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Senha"
                  />
                </div>
              </ValidationProvider>
            </div>
            <div class="mt-4">
              <button
                :disabled="loading"
                type="submit"
                class="w-full inline-flex justify-center items-center px-6 py-2 transition ease-in-out duration-150"
              >
                <svg
                  v-if="loading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span v-else>Login</span>
              </button>
            </div>
            <div class="mt-6 flex justify-center mr-5">
              <NuxtLink
                :to="{ name: 'auth-recovery' }"
                class="text-sm text-primary-dark hover:underline"
              >
                Esqueceu a senha?
              </NuxtLink>

              <NuxtLink
                :to="{ name: 'auth-primeiro-acesso' }"
                class="text-sm ml-5 text-primary-dark hover:underline"
              >
                Primeiro acesso?
              </NuxtLink>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  auth: 'guest',
  data() {
    return {
      login: {},
      loading: false,
      error: null,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async userLogin() {
      console.log('env', process.env.API_URL)
      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      this.loading = true

      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
      } catch (err) {
        this.loading = false
        this.$swal({
          icon: 'error',
          title:
            'E-mail ou senha inválida. Verifique os campos e tente novamente',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: false,
        })
      }
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/mixins.scss';

.login {
  @include background('@/static/images/login-bg.svg', bottom right);
}

button {
  color: #ffffff;
  background: linear-gradient(6.03deg, #00489c 0%, #1d578d 100%);
  border-radius: 8px;
  height: 48px;
  margin: 4px 0px;

  &:disabled {
    background: linear-gradient(6.03deg, #979899 0%, #77a8d5 100%);
  }
}
</style>
