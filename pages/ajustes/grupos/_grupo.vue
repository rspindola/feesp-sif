<template>
  <div>
    <div>
      <h4 class="text-primary-dark">{{ groupInfo.GroupName }}</h4>
      <ul class="breadcrumb">
        <li><nuxt-link to="/ajustes/grupos">Grupos</nuxt-link></li>
        <li>{{ groupInfo.GroupName }}</li>
      </ul>
    </div>
    <div class="main">
      <div class="w-full">
        <h3>Usuários</h3>
        <table class="table-auto w-full text-left">
          <thead class="bg-white text-greyishblue-dark">
            <tr>
              <th class="w-3/12">Nome</th>
              <th class="w-4/12">E-mail</th>
              <th class="w-4/12">Permissão</th>
              <th class="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, i) in sortedItems"
              v-cloak
              :key="i"
              :class="{ editing: user == editedUser }"
            >
              <td>{{ user.UserAttributes.Name }}</td>
              <td>{{ user.UserAttributes.Email }}</td>
              <td>
                <div class="view">
                  {{ setPerm(user.UserAttributes.Permissions) }}
                </div>
                <div class="edit">
                  <v-select
                    :clearable="false"
                    placeholder="Selecione"
                    label="label"
                    :options="permissions"
                    @input="setPermission"
                  />
                </div>
              </td>
              <td>
                <div v-if="perm >= 2" class="view flex items-center space-x-4">
                  <button @click="editData(user)">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.8067 1.755C12.0667 2.015 12.0667 2.435 11.8067 2.695L10.5867 3.915L8.08667 1.415L9.30667 0.195C9.56667 -0.065 9.98667 -0.065 10.2467 0.195L11.8067 1.755ZM0 12.0017V9.50167L7.37333 2.12833L9.87333 4.62833L2.5 12.0017H0Z"
                        fill="#2867A1"
                      />
                    </svg>
                  </button>
                  <button @click="openModalDelete(user)">
                    <img src="@/static/icons/trash.svg" alt="Logo" />
                  </button>
                </div>
                <div class="edit">
                  <button @click="editedUser = {}">cancelar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <ValidationObserver v-if="perm >= 2" ref="form">
          <form @submit.prevent="addToGroup">
            <div class="flex items-center space-x-4">
              <div class="w-5/12">
                <v-select
                  v-model="formData.user"
                  :clearable="false"
                  placeholder="Nome ou Email"
                  label="name"
                  :options="orderUsers"
                >
                  <template #option="{ name, email }">
                    {{ name }} - {{ email }}
                  </template>

                  <template #selected-option="{ name }">
                    {{ name }}
                  </template>

                  <template #no-options="{}">
                    Não possui colaboradores.
                  </template>
                </v-select>
              </div>
              <div class="w-5/12">
                <v-select
                  v-model="formData.permission"
                  :clearable="false"
                  placeholder="Ação"
                  :searchable="false"
                  :options="permissions"
                >
                  <template #option="{ label }">
                    {{ label }}
                  </template>

                  <template #selected-option="{ label }">
                    {{ label }}
                  </template>
                </v-select>
              </div>
              <div class="w-2/12">
                <Button
                  text-label="Adicionar"
                  class="px-6 py-2 button w-full"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
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
          </button>
           -->

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
              @click="removePermission"
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
import Vue from 'vue'
import { mapState } from 'vuex'
import Button from '~/components/Buttons/Button.vue'

export default Vue.extend({
  name: 'SettingsGroupPage',
  components: { Button },
  layout: 'admin',
  async asyncData({ $axios, $auth, route, store }) {
    const { grupo } = route.params
    const token = $auth.strategy.token.get()
    let groupInfo = {}

    const firstPath = route.path.split('/')[1]

    const res = $auth.user.UserAttributes.Permissions.filter((item) => {
      return firstPath
        .toLowerCase()
        .split(' ')
        .every((v) => item.name.toLowerCase().includes(v))
    })

    const perm = res[0].permission

    await store.dispatch('users/get')

    await $axios
      .$get('auth/groups?name=' + grupo, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { group } = response
        groupInfo = group
      })

    return { groupInfo, token, perm }
  },
  data() {
    return {
      modalOpenned: false,
      loading: false,
      selectedUser: null,
      formData: {},
      editMode: false,
      editedUser: null,
      deletedUser: null,
      pageSize: 5,
      currentPage: 1,
      permissions: [
        {
          label: 'Desabilitado',
          value: '0',
        },
        {
          label: 'Ler',
          value: '1',
        },
        {
          label: 'Editar',
          value: '2',
        },
        {
          label: 'Editar/Ler',
          value: '3',
        },
      ],
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
    ...mapState('users', ['users']),
    totalPages() {
      const pages = this.groupInfo.Users.length / this.pageSize
      return Math.ceil(pages)
    },
    cantGoBack() {
      return this.currentPage === 1
    },
    cantGoNext() {
      return this.currentPage === this.totalPages
    },
    sortedItems() {
      return this.groupInfo.Users.filter((row, index) => {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        if (index >= start && index < end) return true
        return false
      })
    },
    orderUsers() {
      const array = this.users
      const a = []
      // eslint-disable-next-line array-callback-return
      array.map((c) => {
        a.push({
          name: c.Name,
          email: c.Email,
        })
      })
      return a
    },
  },
  beforeMount() {
    this.$store.commit('drawer/SET_TABS', this.tabs)
  },
  methods: {
    setPerm(perms) {
      let abc = {}
      // eslint-disable-next-line array-callback-return
      perms.map((x) => {
        if (x.name === this.groupInfo.GroupName) {
          if (x.permission === '0') abc = 'Desabilitado'
          if (x.permission === '1') abc = 'Ler'
          if (x.permission === '2') abc = 'Editar'
          if (x.permission === '3') abc = 'Editar/Ler'
        }
      })
      return abc
    },

    async setPermission(val) {
      const data = {
        email: this.editedUser.UserAttributes.Email,
        groupName: this.groupInfo.GroupName,
        permission: val.value,
      }

      await this.$axios
        .$post('/auth/groups/user', data, {
          headers: {
            Authorization: this.token,
          },
        })
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'Sucesso',
            text: 'Usuário incluido ao grupo com sucesso.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })
          this.editedUser = {}
        })
        .catch((e) => {
          this.$swal({
            icon: 'error',
            title: 'Ops...',
            text: e.response.data.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: false,
          })
        })
        .finally(() => (this.loading = false))
    },

    openModalDelete(user) {
      this.deletedUser = user
      this.modalOpenned = true
    },

    closeModal() {
      this.modalOpenned = false
    },

    async removePermission() {
      const index = this.groupInfo.Users.indexOf(this.deletedUser)
      const userEmail = this.deletedUser.UserAttributes.Email
      await this.$axios
        .$delete(
          '/auth/groups/user',
          {
            data: {
              email: userEmail,
              groupName: this.groupInfo.GroupName,
            },
          },
          {
            headers: {
              Authorization: this.token,
            },
          }
        )
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'Sucesso',
            text: 'Usuário removido do grupo com sucesso.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })
          this.editedUser = {}
          this.closeModal()
        })
        .catch((e) => {
          this.$swal({
            icon: 'error',
            title: 'Ops...',
            text: e.response.data.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: false,
          })
          return false
        })
        .finally(() => (this.loading = false))

      if (index > -1) {
        await this.groupInfo.Users.splice(index, 1)
      }
      return this.groupInfo.Users
    },

    editData(user) {
      this.editedUser = user
    },

    async addToGroup() {
      if (!this.formData.user || !this.formData.permission) return

      this.loading = true
      this.$swal({
        icon: 'info',
        title: 'Enviando...',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        showCloseButton: true,
        timer: false,
      })
      const data = {
        name: this.formData.user.name,
        email: this.formData.user.email,
        groupName: this.groupInfo.GroupName,
        permission: this.formData.permission.value,
      }

      await this.$axios
        .$post('/auth/groups/user', data, {
          headers: {
            Authorization: this.token,
          },
        })
        .then(() => {
          this.groupInfo.Users.push({
            UserAttributes: {
              Name: data.name,
              Email: data.email,
              Permissions: [
                {
                  name: this.groupInfo.GroupName,
                  permission: this.formData.permission.value,
                },
              ],
            },
          })

          this.$swal({
            icon: 'success',
            title: 'Sucesso',
            text: 'Usuário incluido ao grupo com sucesso.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })

          this.formData = {}
        })
        .catch((e) => {
          this.$swal({
            icon: 'error',
            title: 'Ops...',
            text: e.response.data.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: false,
          })
        })
        .finally(() => (this.loading = false))
    },

    nextPage() {
      if (this.currentPage * this.pageSize < this.groupInfo.Users.length)
        this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    goToPage(page) {
      this.currentPage = page + 1
    },
  },
})
</script>

<style lang="scss" scoped>
.main {
  background: #ffffff;
  padding: 29px 32px;

  .box__new {
    border: 1px dashed #2867a1;
    border-radius: 15px;
    padding: 32px 22px 24px 23px;
    margin-bottom: 10px;
  }

  .card {
    margin-bottom: 8px;
    padding: 32px 22px 24px 23px;
    background: #f8fafc;
    border-radius: 8px;

    p {
      font-family: Avenir;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 27px;
      display: flex;
      align-items: center;

      /* Black */

      color: #0f172a;

      &.mutted {
        font-family: Avenir;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 150%;
        /* identical to box height, or 24px */

        display: flex;
        align-items: flex-end;

        /* Greyish dark */

        color: #94a3b8;
      }
    }
  }
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

  // button {
  //   background: #ffffff;
  //   /* Primary dark */

  //   border: 1px solid #2867a1;
  //   box-sizing: border-box;
  //   border-radius: 8px;
  //   padding: 8px 23.5px;
  //   font-family: Avenir;
  //   font-style: normal;
  //   font-weight: 500;
  //   font-size: 16px;
  //   line-height: 150%;
  //   color: #2867a1;
  // }
}
</style>
