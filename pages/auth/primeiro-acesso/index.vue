<template>
  <!-- <Tutorial /> -->
  <div class="login flex items-center justify-center min-h-screen bg-white">
    <div class="px-8 py-6 mt-4 text-left w-10/12 md:w-6/12 lg:w-4/12">
      <div class="flex justify-center">
        <img class="object-center" src="@/static/images/logo.png" alt="Logo" />
      </div>
      <h4 class="text-center my-7">Primeiro acesso</h4>
      <ValidationObserver ref="form" class="w-1/3">
        <form @submit.prevent="sendForm">
          <div class="mt-4">
            <custom-input
              v-model="user.email"
              type="email"
              placeholder="E-mail"
              class="w-full"
              rules="required"
            />
          </div>
          <div class="mt-4">
            <custom-input
              v-model="user.password"
              type="text"
              placeholder="Senha temporaria"
              class="w-full"
              rules="required"
            />
            <span class="helper"
              >A senha temporária, é a que foi enviada para seu e-mail
              cadastrado.</span
            >
          </div>
          <div class="mt-4">
            <custom-input
              v-model="user.newPassword"
              type="password"
              placeholder="Nova Senha"
              class="w-full"
              rules="required"
            />
          </div>
          <div class="mt-4">
            <custom-input
              v-model="user.newPasswordConfirmed"
              type="password"
              placeholder="Confirme a senha"
              class="w-full"
              rules="required"
            />
          </div>
          <div class="mt-6">
            <ButtonLogin
              type="submit"
              text-label="Enviar"
              class="w-full px-6 py-2"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import CustomInput from '~/components/Form/CustomInput.vue'
import ButtonLogin from '~/components/Buttons/Button.vue'

export default {
  name: 'RecoveryPasswordPage',
  components: {
    ButtonLogin,
    CustomInput,
  },
  data() {
    return {
      user: {},
    }
  },
  methods: {
    async sendForm() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      if (this.user.newPassword !== this.user.newPasswordConfirmed) {
        this.$swal({
          icon: 'error',
          title: 'Nova senha não coincide',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: false,
        })
        return
      }

      this.loading = true

      this.$axios
        .$post('/auth/signIn', this.user, {
          headers: {
            Authorization: this.token,
          },
        })
        .then(() => {
          this.$auth.logout()
          this.$router.push({ name: 'auth-login' })
        })
        .catch(() => {
          this.$toast
            .error('Algo deu errado. Verifique os campos e tente novamente.')
            .goAway(1000)
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

.helper {
  color: #94a3b8;
  font-size: 13px;
}
</style>
