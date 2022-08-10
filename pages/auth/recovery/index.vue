<template>
  <!-- <Tutorial /> -->
  <div class="login flex items-center justify-center min-h-screen bg-white">
    <div class="px-8 py-6 mt-4 text-left w-10/12 md:w-6/12 lg:w-4/12">
      <div class="flex justify-center">
        <img class="object-center" src="@/static/images/logo.png" alt="Logo" />
      </div>
      <ValidationObserver ref="form">
        <form @submit.prevent="sendForm">
          <div class="mt-4">
            <custom-input
              v-model="user.email"
              name="email"
              type="email"
              placeholder="E-mail"
              class="w-full"
              rules="required|email"
            />
          </div>

          <div class="mt-4">
            <custom-input
              v-model="user.confirmEmail"
              name="email_confimation"
              type="email"
              placeholder="Confirmar e-mail"
              class="w-full"
              rules="required|email"
            />
          </div>
          <div class="mt-6">
            <ButtonLogin
              type="submit"
              text-label="Recuperar Senha"
              class="w-full px-6 py-2"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import ButtonLogin from '~/components/Buttons/Button.vue'
import CustomInput from '~/components/Form/CustomInput.vue'

export default {
  name: 'RecoveryPasswordPage',
  components: {
    ButtonLogin,
    CustomInput,
  },
  data() {
    return {
      loading: false,
      user: {},
    }
  },
  methods: {
    async sendForm() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      if (this.user.confirmEmail !== this.user.email) {
        this.$swal({
          icon: 'error',
          title: 'E-mails não coincidem',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: false,
        })
      }

      this.loading = true

      const data = {
        email: this.user.email,
      }

      this.$axios
        .$post('/auth/forgotPassword', data, {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
        })
        .then(() => {
          this.$router.push({
            name: 'auth-recovery-send',
            params: { email: data.email },
          })
        })
        .catch(() => {
          this.$toast
            .error(
              'Erro ao tentar recuperar senha. Verifique os campos e tente novamente'
            )
            .goAway(2000)
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

input {
  background-color: #e2e8f0;
}
</style>
