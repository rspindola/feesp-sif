<template>
  <div>
    <div class="main">
      <div class="box__new w-full">
        <h2>Inserir Matrícula</h2>
        <validation-observer ref="form">
          <form @submit.prevent="saveForm">
            <!-- CURSO SELECT -->
            <div class="flex flex-col">
              <div class="w-full">
                <validation-provider v-slot="{ errors }" name="curso">
                  <div class="flex flex-col">
                    <label>Curso</label>
                    <v-select
                      v-model="selectedCourse"
                      :options="courses"
                      label="name"
                      :placeholder="loading ? 'Carregando...' : 'Selecione'"
                      :clearable="false"
                      :disabled="loading"
                      :class="errors.length > 0 ? 'has-error' : ''"
                      @input="setSelected"
                    >
                      <template #option="{ initials, name }">
                        {{ initials }} - {{ name }}
                      </template>
                      <template #selected-option="{ initials, name }">
                        {{ initials }} - {{ name }}
                      </template>
                      <template #no-options="{}"> Não possui cursos. </template>
                    </v-select>
                  </div>
                </validation-provider>
              </div>

              <!-- TURMA SELECT -->
              <div class="w-full">
                <validation-provider v-slot="{ errors }" name="turma">
                  <div class="flex flex-col">
                    <label>Turma</label>
                    <v-select
                      v-model="selectedClass"
                      :clearable="false"
                      :searchable="false"
                      label="id"
                      :disabled="searchClass"
                      :placeholder="
                        searchClass || loading ? 'Carregando...' : 'Selecione'
                      "
                      :options="classes"
                      :class="errors.length > 0 ? 'has-error' : ''"
                      @input="setClass"
                    >
                      <template
                        #option="{ academicYear, local, weekday, time, room }"
                      >
                        {{ academicYear }} - {{ local }} - {{ weekday }}
                        {{ time }} - Sala{{ room }}
                      </template>
                      <template
                        #selected-option="{
                          academicYear,
                          local,
                          weekday,
                          time,
                          room,
                        }"
                      >
                        {{ academicYear }} - {{ local }} - {{ weekday }}
                        {{ time }} - Sala{{ room }}
                      </template>
                      <template #no-options="{}"> Não possui turmas. </template>
                    </v-select>
                  </div>
                </validation-provider>
              </div>

              <!-- COLABORADOR SELECT -->
              <div class="w-full">
                <validation-provider v-slot="{ errors }" name="colaborador">
                  <div class="flex flex-col">
                    <label>Aluno</label>
                    <v-select
                      v-model="selectedUsers"
                      :clearable="false"
                      :disabled="loading"
                      :placeholder="loading ? 'Carregando...' : 'Selecione'"
                      label="name"
                      :options="persons"
                      multiple
                      taggable
                      :class="errors.length > 0 ? 'has-error' : ''"
                    >
                      <template #option="{ name }">
                        {{ name }}
                      </template>

                      <template #selected-option="{ name }">
                        {{ name }}
                      </template>

                      <template #no-options="{}">
                        Não possui colaboradores.
                      </template>
                    </v-select>
                  </div>
                </validation-provider>
              </div>
            </div>
            <div class="w-full">
              <div class="flex justify-end">
                <Button text-label="Salvar" class="px-6 py-2" type="submit" />
              </div>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Button from '~/components/Buttons/Button.vue'

export default {
  name: 'MatriculaPage',
  components: {
    Button,
  },
  layout: 'admin',
  data() {
    return {
      personsFiltered: [],
      options: [],
      loading: false,
      searchClass: false,
      selectedClass: '',
      selectedCourse: '',
      selectedUsers: [],
      data: {
        courseId: null,
        users: [],
        classId: null,
      },
      classes: [],
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
    ...mapState('persons', ['persons']),
    ...mapState('courses', ['courses']),
  },
  async beforeMount() {
    this.loading = true
    await this.$store.commit('drawer/SET_TABS', this.tabs)
    await this.$store.dispatch('persons/get')
    await this.$store.dispatch('courses/get')
    this.loading = false
  },
  methods: {
    ...mapActions('registrations', ['create']),
    async saveForm() {
      // eslint-disable-next-line array-callback-return
      await this.selectedUsers.map((u) => {
        this.data.users.push({
          id: u.id,
          result: 'Em curso',
        })
      })

      const isValid = await this.$refs.form.validate()
      if (!isValid) return

      this.$swal({
        icon: 'info',
        title: 'Enviando...',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 1000,
      })

      try {
        this.create(this.data).then(() => {
          this.$swal({
            icon: 'success',
            title: 'Matrícula cadastrada com sucesso.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })

          this.resetForm()
        })
        // eslint-disable-next-line no-unreachable
      } catch (error) {
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
    onSearch(search, loading) {
      if (search.length) {
        loading(true)
        this.$axios.get(`/courses?name=${escape(search)}`).then((res) => {
          this.options = res.data.courses
          // res.data.courses.json().then((json) => (this.options = json.items))
          loading(false)
        })
      }
    },
    // eslint-disable-next-line no-undef
    resetForm() {
      // this.selectedClass = ''
      // this.selectedCourse = ''
      this.selectedUsers = ''
      // this.classes = []
    },
    async setSelected(value) {
      this.classes = []
      this.selectedClass = null
      this.searchClass = true
      const { id } = value
      this.data.courseId = id
      await this.$axios
        .get(`/classes?courseId=${id}`, {
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
        })
        .then((res) => {
          this.classes = res.data.classes
          this.searchClass = false
        })
    },
    setClass(value) {
      this.data.classId = value.id
    },
    setUser(value) {
      this.selectedUsers.push(value)
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  /* identical to box height */

  /* Primary dark */

  color: #2867a1;
}

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
  }
}
</style>
