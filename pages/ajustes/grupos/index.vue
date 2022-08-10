<template>
  <div>
    <div class="main">
      <!-- <div class="box__new w-full">
        <h2>Criar Grupo</h2>
        <ValidationObserver ref="form">
          <form @submit.prevent="saveForm">
            <div class="flex items-center space-x-4">
              <div class="w-8/12">
                <CustomInput
                  v-model="group.name"
                  label="Nome do Grupo"
                  type="text"
                  placeholder="Nome do grupo"
                  class="w-full"
                  rules="required"
                />
              </div>
              <div class="w-4/12">
                <label>Genero</label>
                <v-select
                  v-model="group.permissions"
                  :clearable="false"
                  placeholder="Selecione"
                  :options="permissions"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-10/12">
                <CustomInput
                  v-model="group.description"
                  label="Descrição"
                  type="text"
                  placeholder="Descrição"
                  class="w-full"
                  rules="required"
                />
              </div>
              <div class="w-2/12">
                <Button text-label="Criar" class="px-6 w-full py-2" />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div> -->
      <div class="w-full">
        <table class="table-auto w-full text-left">
          <thead class="bg-white text-greyishblue-dark">
            <tr>
              <th class="w-3/12">Nome do grupo</th>
              <th class="w-8/12">Descrição</th>
              <th class="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, g) in sortedItems" :key="g">
              <td>{{ item.GroupName }}</td>
              <td>{{ item.Description }}</td>
              <NuxtLink
                :to="{
                  name: 'ajustes-grupos-grupo',
                  params: { grupo: item.GroupName },
                }"
              >
                <view-button />
              </NuxtLink>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex w-full justify-center items-center">
        <div class="pagination">
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
              <rect x="1" y="1" width="32" height="32" rx="8" fill="#F8FAFC" />
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
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ViewButton from '~/components/Buttons/ViewButton.vue'

// import CustomInput from '@/components/Form/CustomInput.vue'
// import Button from '~/components/Buttons/Button.vue'

export default {
  name: 'SettingsGroupPage',
  components: {
    // Button,
    ViewButton,
    // CustomInput,
  },
  layout: 'admin',
  data() {
    return {
      loading: false,
      pageSize: 5,
      currentPage: 1,
      group: {},
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

  async fetch({ store }) {
    this.loading = true
    await store.dispatch('groups/get', {})
    this.loading = false
  },

  computed: {
    ...mapState('groups', ['groups', 'permissions']),
    totalPages() {
      const pages = this.groups.length / this.pageSize
      return Math.ceil(pages)
    },
    cantGoBack() {
      return this.currentPage === 1
    },
    cantGoNext() {
      return this.currentPage === this.totalPages
    },
    sortedItems() {
      return this.groups.filter((row, index) => {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        if (index >= start && index < end) return true
        return false
      })
    },
  },
  async beforeMount() {
    await this.$store.commit('drawer/SET_TABS', this.tabs)
  },
  methods: {
    ...mapActions('groups', ['create']),
    nextPage() {
      if (this.currentPage * this.pageSize < this.groups.length)
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

  button {
    margin-top: 35px;
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
}
</style>
