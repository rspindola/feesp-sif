<template>
  <div>
    <div class="main">
      <div v-if="perm >= 2" class="box__new w-full">
        <h4 class="text-primary-dark">Cadastrar Usuário</h4>
        <ValidationObserver ref="form">
          <form @submit.prevent="saveForm">
            <div class="flex items-center space-x-4">
              <div class="w-5/12">
                <CustomInput
                  v-model="formData.name"
                  label="Nome"
                  type="text"
                  class="w-full"
                  rules="required"
                />
              </div>
              <div class="w-5/12">
                <CustomInput
                  v-model="formData.email"
                  label="E-mail"
                  type="email"
                  class="w-full"
                  rules="required|email"
                />
              </div>
              <div class="w-2/12">
                <Button
                  text-label="Adicionar"
                  class="px-6 py-2 button"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <div class="w-full">
        <table class="table-auto w-full text-left">
          <thead class="bg-white text-greyishblue-dark">
            <tr>
              <th class="w-3/12">Nome</th>
              <th class="w-3/12">E-mail</th>
              <th class="w-5/12">Grupos</th>
              <th class="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, u) in sortedItems"
              :key="u"
              :class="{ editing: user == editedUser }"
            >
              <td>
                {{ user.Name }}
              </td>
              <td>
                {{ user.Email }}
              </td>
              <td>{{ getPerm(user.Permissions) }}</td>
              <td v-if="$auth.user.UserAttributes.Sub !== user.Sub">
                <delete-button
                  v-show="perm >= 2"
                  @click.native="openModalDelete(user)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex w-full justify-center items-center">
          <div class="pagination">
            <button
              class="btn-prev-outlined"
              :disabled="cantGoBack"
              @click="prevPage"
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="32" height="32" rx="8" fill="#F8FAFC"/>
              <path d="M22.3546 16.3333H14.2039L17.9477 12.6066L16.9967 11.6666L11.6388 17L16.9967 22.3333L17.941 21.3933L14.2039 17.6666H22.3546V16.3333Z" fill="url(#paint0_linear_772_8902)"/>
              <rect x="1" y="1" width="32" height="32" rx="8" stroke="url(#paint1_linear_772_8902)"/>
              <defs>
              <linearGradient id="paint0_linear_772_8902" x1="11.6388" y1="22.3333" x2="12.8652" y2="10.6689" gradientUnits="userSpaceOnUse">
              <stop stop-color="#00489C"/>
              <stop offset="1" stop-color="#1D578D"/>
              </linearGradient>
              <linearGradient id="paint1_linear_772_8902" x1="1" y1="33" x2="4.69578" y2="-1.98963" gradientUnits="userSpaceOnUse">
              <stop stop-color="#00489C"/>
              <stop offset="1" stop-color="#1D578D"/>
              </linearGradient>
              </defs>
              </svg>
            </button>

            <!-- <button
              v-for="(page, z) in totalPages"
              :key="z + 'pag'"
              class="number-page"
              :class="z + 1 === currentPage ? 'active' : ''"
              @click.prevent="goToPage(z)"
            >
              {{ z + 1 }}
            </button> -->

            <button
              class="btn-next-outlined"
              :disabled="cantGoNext"
              @click="nextPage"
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 9C1 4.58172 4.58172 1 9 1H25C29.4183 1 33 4.58172 33 9V25C33 29.4183 29.4183 33 25 33H9C4.58172 33 1 29.4183 1 25V9Z" fill="#F8FAFC"/>
<path d="M16.9967 11.6666L16.0524 12.6066L19.7895 16.3333H11.6388V17.6666H19.7895L16.0524 21.3933L16.9967 22.3333L22.3546 17L16.9967 11.6666Z" fill="url(#paint0_linear_772_8911)"/>
<path d="M9 1.5H25V0.5H9V1.5ZM32.5 9V25H33.5V9H32.5ZM25 32.5H9V33.5H25V32.5ZM1.5 25V9H0.5V25H1.5ZM9 32.5C4.85786 32.5 1.5 29.1421 1.5 25H0.5C0.5 29.6944 4.30558 33.5 9 33.5V32.5ZM32.5 25C32.5 29.1421 29.1421 32.5 25 32.5V33.5C29.6944 33.5 33.5 29.6944 33.5 25H32.5ZM25 1.5C29.1421 1.5 32.5 4.85786 32.5 9H33.5C33.5 4.30558 29.6944 0.5 25 0.5V1.5ZM9 0.5C4.30558 0.5 0.5 4.30558 0.5 9H1.5C1.5 4.85786 4.85786 1.5 9 1.5V0.5Z" fill="url(#paint1_linear_772_8911)"/>
<defs>
<linearGradient id="paint0_linear_772_8911" x1="11.6388" y1="22.3333" x2="12.8652" y2="10.6689" gradientUnits="userSpaceOnUse">
<stop stop-color="#00489C"/>
<stop offset="1" stop-color="#1D578D"/>
</linearGradient>
<linearGradient id="paint1_linear_772_8911" x1="1" y1="33" x2="4.69578" y2="-1.98963" gradientUnits="userSpaceOnUse">
<stop stop-color="#00489C"/>
<stop offset="1" stop-color="#1D578D"/>
</linearGradient>
</defs>
</svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div
      v-if="modalOpenned"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  id="modal-title"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  Excluir usuário
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Tem certeza de que deseja excluir esse usuário? Todos os
                    seus dados serão removidos permanentemente. Esta ação não
                    pode ser desfeita.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="confirmDelete"
            >
              Excluir
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="closeModal"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import CustomInput from '@/components/Form/CustomInput.vue'
import Button from '@/components/Buttons/Button.vue'
import DeleteButton from '@/components/Buttons/DeleteButton.vue'

export default {
  name: 'UsersPage',
  components: {
    CustomInput,
    Button,
    DeleteButton,
  },
  layout: 'admin',
  async asyncData({ $axios, $auth, route }) {
    const token = $auth.strategy.token.get()
    let usersList = {}
    const firstPath = route.path.split('/')[1]

    const res = $auth.user.UserAttributes.Permissions.filter((item) => {
      return firstPath
        .toLowerCase()
        .split(' ')
        .every((v) => item.name.toLowerCase().includes(v))
    })

    const perm = res[0].permission

    await $axios
      .$get('auth/users', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { users } = response
        usersList = users
      })

    return { usersList, token, firstPath, perm }
  },
  data() {
    return {
      modalOpenned: false,
      users: [],
      editMode: false,
      editedUser: {},
      deletedUser: {},
      formData: {},
      pageSize: 5,
      currentPage: 1,
      tabs: [
        {
          label: 'Usuários',
          route: 'ajustes-usuarios',
        },
        {
          label: 'Grupos',
          route: 'ajustes-grupos',
        },
      ],
    }
  },
  computed: {
    checkPerms() {
      return true
    },
    totalPages() {
      const pages = this.usersList.length / this.pageSize
      return Math.ceil(pages)
    },
    cantGoBack() {
      return this.currentPage === 1
    },
    cantGoNext() {
      return this.currentPage === this.totalPages
    },
    sortedItems() {
      return this.usersList.filter((row, index) => {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        if (index >= start && index < end) return true
        return false
      })
    },
  },
  beforeMount() {
    this.$store.commit('drawer/SET_TABS', this.tabs)
  },
  methods: {
    ...mapActions('users', ['createUser', 'deleteUser', 'updateUser']),
    async saveForm() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      const data = {
        Name: this.formData.name,
        Email: this.formData.email,
      }

      this.$swal({
        icon: 'info',
        title: 'Enviando...',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        showCloseButton: true,
        timer: false,
      })

      try {
        await this.createUser(this.formData).then(() => {
          this.$swal({
            icon: 'success',
            title: 'Sucesso',
            text: 'Usuário criado com sucesso.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })
        })
        await this.usersList.push(data)
        this.formData = {}
      } catch (error) {
        console.log('bateu aqui')
        this.$swal({
          icon: 'error',
          title: 'Ops...',
          text: error.message,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: false,
        })
      }
    },

    getPerm(value) {
      const perms = []
      if (!value) {
        return 'Não possui'
      }

      value.map((x) => perms.push(x.name))

      return perms.join(' / ')
    },

    editUser(user) {
      this.editedUser = user
    },

    async saveUser() {
      this.$swal({
        icon: 'info',
        title: 'Enviando...',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        showCloseButton: true,
        timer: false,
      })
      try {
        await this.updateUser({
          name: this.editedUser.Name,
          email: this.editedUser.Email,
        })
        this.editedUser = {}
        this.$swal({
          icon: 'success',
          title: 'Sucesso.',
          text: 'Usuário cadastrado com sucesso.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: 2000,
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: 'Ops...',
          text: error.response.data.message,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: false,
        })
      }
    },

    openModalDelete(user) {
      this.deletedUser = user
      this.modalOpenned = true
    },

    closeModal() {
      this.modalOpenned = false
    },

    async confirmDelete() {
      const email = this.deletedUser.Email

      try {
        const index = this.usersList.indexOf(this.deletedUser)

        await this.deleteUser(email)

        if (index > -1) {
          await this.usersList.splice(index, 1)
        }

        this.closeModal()

        this.$swal({
          icon: 'success',
          title: 'Sucesso.',
          text: 'Usuário excluido com sucesso.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: 2000,
        })
        return this.usersList
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: 'Ops...',
          text: error.response.data.message,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: false,
        })
      }
    },

    nextPage() {
      if (this.currentPage * this.pageSize < this.usersList.length)
        this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    goToPage(page) {
      this.currentPage = page + 1
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  margin-top: 35px;
}
.main {
  background: #ffffff;
  padding: 29px 32px;
  table {
    th {
      font-family: Avenir;
      font-style: normal;
      font-weight: 800;
      font-size: 16px;
      line-height: 150%;
      padding: 16px 12px;
    }
    td {
      padding: 16px 12px;
      font-family: Avenir;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 150%;
      color: #475569;
    }
  }
}
</style>
