<template>
  <div class="main">
    <h4 class="text-center mb-5 text-primary-regular">Meu perfil</h4>
    <div
      class="flex flex-col justify-center items-center w-full md:w-full lg:w-full"
    >
      <div class="py-3 center mx-auto">
        <!-- <div class="bg-white px-4 py-5 rounded-lg text-center w-48">
          <label class="cursor-pointer mt-6">
            <img
              class="w-auto mx-auto rounded-full object-cover object-center"
              :src="user.UserAttributes.Profile_pic || '@/static/avatar.png'"
              alt="Avatar Upload"
            />
            <input
              type="file"
              class="hidden"
              accept="image"
              @change="onFileChanged"
            />
          </label>

          <button
            v-if="selectedFile"
            class="mt-2 text-base leading-normal px-4 py-2 bg-primary-dark text-white text-sm rounded-full"
            type="button"
            :disabled="loadingAvatar"
            @click="uploadAvatar"
          >
            {{ loadingAvatar ? 'Enviando...' : 'Alterar' }}
          </button>
        </div> -->
      </div>
      <div class="flex items-center justify-around w-2/3">
        <ValidationObserver ref="form" class="w-2/3 mx-3">
          <form @submit.prevent="changeProfile">
            <div class="mt-4 w-30">
              <div class="flex flex-col">
                <custom-input
                  v-model="user.UserAttributes.Name"
                  label="Nome"
                  type="text"
                  placeholder="Nome"
                  class="w-full"
                  rules="required"
                />
              </div>
              <div class="mt-4">
                <custom-input
                  v-model="user.UserAttributes.Email"
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  class="w-full"
                  rules="required|email"
                />
              </div>
              <div class="mt-4">
                <custom-input
                  v-model="user.UserAttributes.confirmEmail"
                  label="Confirmar E-mail"
                  type="email"
                  name="email_confirmation"
                  placeholder="E-mail"
                  class="w-full"
                  rules="required|email"
                  :has-message="true"
                />
              </div>
              <div class="mt-4 flex justify-start">
                <button
                  :disabled="loading"
                  type="submit"
                  class="inline-flex justify-center items-center px-6 py-2 transition ease-in-out duration-150"
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
                  <span v-else>Salvar Informações</span>
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
        <ValidationObserver ref="newPass" class="w-1/3 mx-3">
          <form @submit.prevent="changePassword">
            <div class="mt-4 w-30">
              <div class="flex flex-col">
                <custom-input
                  v-model="password.old"
                  name="oldest"
                  label="Senha atual"
                  type="password"
                  placeholder="Senha Atual"
                  class="w-full"
                  rules="required"
                />
              </div>
              <div class="mt-4">
                <custom-input
                  v-model="password.new"
                  name="password"
                  label="Nova Senha"
                  type="text"
                  placeholder="Digite a nova senha"
                  class="w-full"
                  rules="required"
                />
              </div>
              <div class="mt-4">
                <custom-input
                  v-model="password.confirmed"
                  name="password_confirmation"
                  label="Confirmar a senha"
                  type="text"
                  placeholder="Confirme a nova senha"
                  class="w-full"
                  rules="required"
                  :has-message="true"
                />
              </div>
              <div class="mt-4 flex justify-start">
                <button
                  :disabled="loading"
                  type="submit"
                  class="inline-flex justify-center items-center px-6 py-2 transition ease-in-out duration-150"
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
  </div>
</template>

<script>
import CustomInput from '@/components/Form/CustomInput.vue'

export default {
  name: 'ProfilePage',
  components: { CustomInput },
  layout: 'admin',
  async asyncData({ $axios, $auth }) {
    const token = $auth.strategy.token.get()

    let user = {}

    await $axios
      .$get('/auth/me', {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        user = result.user
      })

    return { user, token }
  },
  data() {
    return {
      selectedFile: '',
      errors: [],
      loading: false,
      loadingAvatar: false,
      password: {
        old: '',
        new: '',
        confirmed: '',
      },
    }
  },
  beforeMount() {
    this.$store.commit('drawer/SET_TABS', [])
  },
  methods: {
    async changeProfile() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      if (
        this.user.UserAttributes.confirmEmail !== this.user.UserAttributes.Email
      ) {
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
        name: this.user.UserAttributes.Name,
        email: this.user.UserAttributes.Email,
      }

      this.$axios
        .$put(`/auth/users?email=${data.email}`, data, {
          headers: {
            Authorization: this.token,
          },
        })
        .then(() => {
          this.user.UserAttributes.confirmEmail = ''
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: 'Erro ao alterar perfil.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: false,
          })
        })
        .finally(() => (this.loading = false))
    },
    async changePassword() {
      const isValid = await this.$refs.newPass.validate()
      if (!isValid) return

      if (this.password.new !== this.password.confirmed) {
        this.$swal({
          icon: 'error',
          title: 'Senhas não coincidem',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: false,
        })
        return
      }
      this.loading = true
      const data = {
        password: this.password.old,
        newPassword: this.password.new,
      }

      this.$axios
        .$post('/auth/changePassword', data, {
          headers: {
            Authorization: this.token,
          },
        })
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'Sucesso.',
            text: 'Senha alterada.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })
          this.password = {}
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: 'Erro ao alterar a senha',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: false,
          })
        })
        .finally(() => (this.loading = false))
    },

    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
    },

    async uploadAvatar() {
      const fd = new FormData()
      fd.append('avatar', this.selectedFile, this.selectedFile.name)
      this.loadingAvatar = true
      await this.$axios
        .$put('/auth/users/profile-pic', fd, {
          headers: {
            Authorization: this.token,
          },
        })
        .catch(() => {
          this.$toast
            .error('Erro ao alterar avatar. Tente novamente.')
            .goAway(1000)
        })
        .finally(() => {
          this.loadingAvatar = false
          this.selectedFile = ''
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.main {
  background: #ffffff;
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
