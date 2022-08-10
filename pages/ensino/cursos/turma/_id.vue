<template>
  <div>
    <page-loading v-if="loading" />
    <div v-else>
      <div>
        <h4 class="text-primary-dark">
          {{ $route.params.course }}
        </h4>
        <ul class="breadcrumb">
          <li><nuxt-link to="/ensino/cursos">Cursos</nuxt-link></li>
          <li>
            <nuxt-link
              :to="{ name: 'ensino-cursos-id', params: { id: turma.courseId } }"
            >
              {{ courseName }}
            </nuxt-link>
          </li>
          <li>Turma - {{ makeNameClass }}</li>
        </ul>
      </div>
      <div class="main flex flex-col text-primary-dark">
        <div>
          <h6>
            {{ titleClass(turma) }}
          </h6>
        </div>
        <div class="w-full">
          <h5 class="my-6">Alunos</h5>

          <table class="table-auto w-full text-left">
            <thead class="bg-primary-regular text-white">
              <tr>
                <th class="w-3/12">Nome</th>
                <th class="w-4/12">Resultado</th>
                <th class="w-4/12">Observação</th>
                <th class="w-1/12"></th>
              </tr>
            </thead>
            <tbody v-if="alunos.length > 0">
              <tr
                v-for="(aluno, x) in alunos"
                v-cloak
                :key="x"
                :class="{ editing: aluno == editedStudent }"
              >
                <td>{{ aluno.user.name }}</td>
                <td>
                  <div class="view">
                    {{ aluno.result }}
                  </div>
                  <div class="edit">
                    <v-select
                      v-model="editedStudent.result"
                      :filterable="false"
                      :clearable="false"
                      placeholder="Selecione"
                      :options="options"
                    />
                  </div>
                </td>
                <td>
                  <div class="view">
                    {{ aluno.obs }}
                  </div>
                  <div class="edit">
                    <custom-input
                      v-model="editedStudent.obs"
                      placeholder="Observação"
                    />
                  </div>
                </td>
                <td>
                  <div class="view flex items-center">
                    <edit-button class="mx-3" @click.native="editData(aluno)" />
                    <delete-button @click.native="openModalDelete(aluno)" />
                  </div>
                  <div class="edit">
                    <button @click="handleUpdateCourse">Salvar</button>
                    <button @click="editedAluno = null">Cancelar</button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" class="text-center">
                  Não possuem alunos cadastrados nessa turma
                </td>
              </tr>
            </tbody>
          </table>
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
                  Excluir aluno
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Tem certeza de que deseja excluir esse aluno? Todos os seus
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
import EditButton from '~/components/Buttons/EditButton.vue'
import DeleteButton from '~/components/Buttons/DeleteButton.vue'
import CustomInput from '~/components/Form/CustomInput.vue'
import PageLoading from '~/components/Pages/PageLoading.vue'

export default Vue.extend({
  name: 'CursoTurmaPage',
  components: { PageLoading, CustomInput, EditButton, DeleteButton },
  layout: 'admin',
  async asyncData({ $auth, route, $axios, store }) {
    const firstPath = route.path.split('/')[1]
    const token = $auth.strategy.token.get()
    const classID = route.params.id
    let turma = {}
    let alunos = []
    let courseName

    await $axios
      .get(`/classes?id=${classID}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        turma = res.data.class
        alunos = res.data.class.registrations
      })

    await $axios
      .$get('courses?id=' + turma.courseId, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        courseName = response.course.name
      })

    const res = await $auth.user.UserAttributes.Permissions.filter((item) => {
      return firstPath
        .toLowerCase()
        .split(' ')
        .every((v) => item.name.toLowerCase().includes(v))
    })

    const perm = res[0].permission
    return { perm, turma, courseName, alunos }
  },
  data() {
    return {
      loading: false,
      editMode: false,
      editedAluno: {},
      editedStudent: {},
      modalOpenned: false,
      deletedClass: {},
      formData: {},
      options: ['Em curso', 'Aprovado', 'Reprovado'],
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
    ...mapState('classes', ['loading']),
    makeNameClass() {
      const name = `${this.turma.academicYear.substring(
        1,
        3
      )}F${this.turma.weekday.substring(0, 3)}${this.turma.time.substring(
        0,
        2
      )}`
      return name.toUpperCase()
    },
  },
  async beforeCreate() {
    await this.$store.dispatch('classes/show', { id: this.$route.params.id })
    this.$store.commit('drawer/SET_TABS', this.tabs)
  },
  methods: {
    ...mapActions('classes', ['removeStudent', 'updateClass']),
    ...mapActions('registrations', ['updateRegistration']),

    titleClass(turma) {
      return `Turma ${turma.academicYear} - ${turma.local} -
            ${turma.weekday} ${turma.time} - Sala ${turma.room}`
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
        await this.updateRegistration(this.editedStudent).then(() => {
          this.$swal({
            icon: 'success',
            title: 'Aluno alterado com sucesso.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })
          this.editedStudent = {}
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

    editData(aluno) {
      this.editedStudent = aluno
    },

    openModalDelete(aluno) {
      this.deletedAluno = aluno
      this.modalOpenned = true
    },

    closeModal() {
      this.modalOpenned = false
    },

    async confirmDelete() {
      const { id } = this.deletedAluno

      try {
        const index = this.alunos.indexOf(this.deletedAluno)

        await this.removeStudent(id)

        if (index > -1) {
          await this.alunos.splice(index, 1)
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

        return this.alunos
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

<style lang="scss" scoped>
.main {
  background: #ffffff;
  padding: 29px 32px;

  table {
    th {
      font-family: 'Avenir-Heavy';
      font-style: normal;
      font-weight: 800;
      font-size: 16px;
      line-height: 150%;
      padding: 16px 12px;
    }
    tbody {
      tr {
        &:hover {
          background: #e2e8f0;
        }
      }
      td {
        padding: 16px 12px;
        font-family: 'Avenir-Roman';
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 150%;
        color: #475569;
      }
    }
  }
}
</style>
