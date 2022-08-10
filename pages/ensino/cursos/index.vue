<template>
  <div>
    <div>
      <ul class="breadcrumb">
        <li>Cursos</li>
      </ul>
    </div>
    <div class="main">
      <ValidationObserver v-if="perm >= 2" ref="form">
        <form @submit.prevent="handleAddCourse">
          <div class="box__new w-full">
            <h4 class="text-primary-dark">Criar Curso</h4>
            <div class="flex space-x-4">
              <div class="w-20">
                <CustomInput
                  v-model="courseInitials"
                  type="text"
                  placeholder="Sigla"
                  class="w-full"
                  rules="required|min:2|max:3"
                  max="3"
                  min="2"
                />
              </div>
              <div class="flex-1">
                <CustomInput
                  v-model="courseName"
                  type="text"
                  placeholder="Nome do curso"
                  class="w-full"
                  rules="required"
                />
              </div>
            </div>
            <div class="flex space-x-4 items-end">
              <div class="w-11/12">
                <CustomInput
                  v-model="courseObs"
                  label="Observações"
                  type="text"
                  placeholder="Observação"
                  class="w-full"
                />
              </div>
              <div class="w-1/12">
                <Button type="submit" text-label="Criar" class="px-6 py-2" />
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <div class="list">
        <div v-if="loading" class="list-loading">
          <div
            v-for="(n, x) in 3"
            :key="x + 'ske'"
            class="card flex justify-between items-center bg-primary-light animate-pulse skeleton"
          >
            <div class="text"></div>
            <div class="btn"></div>
          </div>
        </div>
        <div v-else>
          <div class="flex justify-end">
            <input
              v-model="searchQuery"
              class="w-full form-control"
              type="text"
              placeholder="Pesquise aqui"
            />
          </div>
          <div v-if="sortedItems.length === 0" class="text-center my-5">
            <p class="warning-no-items">Não possui cursos cadastrados</p>
          </div>
          <div
            v-for="(item, i) in sortedItems"
            v-cloak
            v-else
            :key="i + 'course'"
            :class="{ editing: item == editedCourse }"
            class="card flex items-center bg-primary-light"
          >
            <div class="flex-none mx-3">
              <div class="view flex flex-col items-center justify-center">
                <edit-button v-if="perm >= 2" @click.native="editData(item)" />
                <delete-button
                  v-if="perm >= 2"
                  @click.native="openModalDelete(item)"
                />
              </div>
            </div>
            <div class="flex-1">
              <div class="view">
                <p>{{ item.initials }} - {{ item.name }}</p>
              </div>
              <div class="edit w-full">
                <div class="flex space-x-4">
                  <div class="w-full">
                    <CustomInput
                      v-model="editedCourse.name"
                      type="text"
                      placeholder="Nome do curso"
                      class="w-full"
                      rules="required"
                    />
                  </div>
                </div>
              </div>
              <div class="view">
                <p class="mutted">
                  {{ item.obs }}
                </p>
              </div>
              <div class="edit w-full">
                <CustomInput
                  v-model="editedCourse.obs"
                  type="text"
                  placeholder="Observação"
                  class="w-full"
                  rules="required"
                />
              </div>
            </div>
            <div class="flex-none">
              <div class="view">
                <NuxtLink
                  :to="{
                    name: 'ensino-cursos-id',
                    params: { id: item.id },
                  }"
                >
                  <outline-button
                    class-type="mx-3 whitespace-nowrap"
                    label="exibir turmas"
                  />
                </NuxtLink>
              </div>
              <div class="edit">
                <Button
                  text-label="Salvar"
                  class="px-3 py-1"
                  @click.native="handleUpdateCourse"
                />
                <button @click="editedCourse = {}">cancelar</button>
              </div>
            </div>
          </div>
          <div class="flex w-full justify-center items-center">
            <div v-show="!searchQuery" class="pagination">
              <button
                class="btn-prev-outlined"
                :disabled="cantGoBack"
                @click="prevPage"
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="32"
                    height="32"
                    rx="8"
                    fill="#F8FAFC"
                  />
                  <path
                    d="M22.3546 16.3333H14.2039L17.9477 12.6066L16.9967 11.6666L11.6388 17L16.9967 22.3333L17.941 21.3933L14.2039 17.6666H22.3546V16.3333Z"
                    fill="url(#paint0_linear_772_8902)"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="32"
                    height="32"
                    rx="8"
                    stroke="url(#paint1_linear_772_8902)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_772_8902"
                      x1="11.6388"
                      y1="22.3333"
                      x2="12.8652"
                      y2="10.6689"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#00489C" />
                      <stop offset="1" stop-color="#1D578D" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_772_8902"
                      x1="1"
                      y1="33"
                      x2="4.69578"
                      y2="-1.98963"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#00489C" />
                      <stop offset="1" stop-color="#1D578D" />
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
                  Excluir curso
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Tem certeza de que deseja excluir esse curso? Todos os seus
                    dados serão removidos permanentemente. Esta ação não pode
                    ser desfeita.
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
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

import DeleteButton from '~/components/Buttons/DeleteButton.vue'
import EditButton from '~/components/Buttons/EditButton.vue'
import OutlineButton from '~/components/Buttons/OutlineButton.vue'
import CustomInput from '~/components/Form/CustomInput.vue'
import Button from '~/components/Buttons/Button.vue'

export default Vue.extend({
  name: 'CursosPage',
  components: {
    CustomInput,
    DeleteButton,
    EditButton,
    OutlineButton,
    Button,
  },
  layout: 'admin',
  async asyncData({ $auth, route, $axios }) {
    const firstPath = route.path.split('/')[1]
    const token = $auth.strategy.token.get()
    let coursesList = []

    await $axios
      .$get('courses', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { courses } = response
        coursesList = courses
      })

    const res = await $auth.user.UserAttributes.Permissions.filter((item) => {
      return firstPath
        .toLowerCase()
        .split(' ')
        .every((v) => item.name.toLowerCase().includes(v))
    })

    const perm = res[0].permission
    return { perm, coursesList }
  },
  data() {
    return {
      modalOpenned: false,
      deletedCourse: {},
      searchQuery: null,
      pageSize: 3,
      currentPage: 1,
      editMode: false,
      editedCourse: {},
      courseName: '',
      courseInitials: '',
      courseObs: '',
      tabs: [
        {
          label: 'Cursos',
          route: 'ensino-cursos',
        },
        {
          label: 'Matrícula',
          route: 'ensino-matricula',
        },
      ],
    }
  },
  computed: {
    ...mapState('courses', ['loading']),
    totalPages() {
      const pages = this.coursesList.length / this.pageSize
      return Math.ceil(pages)
    },
    cantGoBack() {
      return this.currentPage === 1
    },
    cantGoNext() {
      return this.currentPage === this.totalPages
    },
    sortedItems() {
      if (this.searchQuery) {
        return this.coursesList.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.coursesList.filter((row, index) => {
          const start = (this.currentPage - 1) * this.pageSize
          const end = this.currentPage * this.pageSize
          if (index >= start && index < end) return true
          return false
        })
      }
    },
  },
  watch: {
    courseInitials(newValue) {
      const val = newValue.replace(/ /g, '')
      this.courseInitials = val
    },
  },
  async beforeMount() {
    await this.$store.dispatch('courses/get')
    this.$store.commit('drawer/SET_TABS', this.tabs)
  },
  methods: {
    ...mapActions('courses', ['deleteCourse', 'updateCourse']),
    nextPage() {
      if (this.currentPage * this.pageSize < this.coursesList.length)
        this.currentPage++
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },

    goToPage(page) {
      this.currentPage = page + 1
    },

    editData(course) {
      this.editedCourse = course
    },

    async handleAddCourse() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      this.$swal({
        icon: 'info',
        title: 'Enviando...',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        showCloseButton: true,
        timer: false,
      })

      const newCourse = {
        name: this.courseName,
        initials: this.courseInitials,
        obs: this.courseObs,
      }

      await this.$axios
        .$post('courses', newCourse)
        .then((response) => {
          this.coursesList.push({
            id: response.id,
            ...newCourse,
          })

          // Reset Form
          this.courseName = ''
          this.courseInitials = ''
          this.courseObs = ''

          this.$swal({
            icon: 'success',
            title: 'Sucesso.',
            text: 'Curso cadastrado com sucesso.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })
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
    },

    async handleUpdateCourse() {
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
        await this.updateCourse(this.editedCourse).then(() => {
          this.$swal({
            icon: 'success',
            title: 'Curso alterado com sucesso.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })
          this.editedCourse = {}
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

    openModalDelete(course) {
      this.deletedCourse = course
      this.modalOpenned = true
    },

    closeModal() {
      this.modalOpenned = false
    },

    async confirmDelete() {
      const { id } = this.deletedCourse

      try {
        const index = this.coursesList.indexOf(this.deletedCourse)

        await this.deleteCourse(id)

        if (index > -1) {
          await this.coursesList.splice(index, 1)
        }

        this.closeModal()

        this.$swal({
          icon: 'success',
          title: 'Curso excluido com sucesso.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: 2000,
        })

        return this.coursesList
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
  },
})
</script>
<style scoped>
.box__new {
  border: 1px dashed #2867a1;
  border-radius: 15px;
  padding: 32px 22px 24px 23px;
  margin-bottom: 10px;
}
</style>
