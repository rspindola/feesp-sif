<template>
  <!-- <Tutorial /> -->
  <div class="login flex items-center justify-center min-h-screen bg-white">
    <div class="px-8 py-6 mt-4 text-left w-10/12 md:w-6/12 lg:w-4/12">
      <div class="flex justify-center">
        <img class="object-center" src="@/static/images/logo.png" alt="Logo" />
      </div>
      <ValidationObserver ref="form" class="w-1/3 mx-3">
        <form @submit.prevent="sendForm">
          <div class="mt-4 w-30">
            <div class="mt-4">
              <custom-input
                v-model="email"
                name="email"
                type="email"
                class="w-full"
                rules="required"
                :disabled="true"
              />
            </div>
            <div class="mt-4">
              <custom-input
                v-model="code"
                name="code"
                type="text"
                placeholder="Código de recuperação"
                class="w-full"
                rules="required"
              />
            </div>
            <div class="mt-4">
              <custom-input
                v-model="password.newPassword"
                name="password"
                placeholder="Nova Senha"
                type="password"
                class="w-full"
                rules="required"
              />
            </div>
            <div class="mt-4">
              <custom-input
                v-model="password.newPasswordConfirmed"
                name="password_confirmation"
                placeholder="Confirmar a senha"
                type="password"
                class="w-full"
                rules="required"
                :has-message="true"
              />
            </div>
            <div class="mt-4 flex justify-start">
              <button
                :disabled="loading"
                type="submit"
                class="inline-flex w-full justify-center items-center px-6 py-2 transition ease-in-out duration-150"
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
                <span v-else>Salvar senha</span>
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import CustomInput from '~/components/Form/CustomInput.vue'

export default {
  name: 'RecoveryPasswordPage',
  components: {
    CustomInput,
  },
  data() {
    return {
      loading: false,
      code: '',
      email: this.$route.params.email,
      password: {},
    }
  },
  methods: {
    async sendForm() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      if (this.password.newPassword !== this.password.newPasswordConfirmed) {
        this.$swal({
          icon: 'error',
          title: 'Senhas não coincidem',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: false,
        })
      }

      this.loading = true
      const data = {
        email: this.email,
        code: this.code,
        newPassword: this.password.newPassword,
      }

      this.$axios
        .$post('/auth/resetPassword', data)
        .then(() => {
          this.$router.push({ name: 'auth-login' })
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: 'Aconteceu algo errado. Tente novamente.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: false,
          })
        })
        .finally(() => (this.loading = false))
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
    cursor: not-allowed;
  }
}
</style>
