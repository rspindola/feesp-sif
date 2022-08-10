<template>
  <div>
    <div>
      <h3>Pessoas cadastradas</h3>
      <ul class="breadcrumb">
        <li>Cadastro único</li>
        <li>Pessoas cadastradas</li>
      </ul>
    </div>
    <div class="main">
      <div class="list">
        <div v-if="loading" class="list-loading">
          <div
            v-for="(n, x) in 5"
            :key="x + 'ske'"
            class="card flex justify-between items-center bg-primary-light animate-pulse skeleton"
          >
            <div class="text"></div>
            <div class="btn"></div>
          </div>
        </div>
        <div v-else>
          <div class="w-full flex justify-end">
            <NuxtLink :to="{ name: 'cadastro-unico-novo' }">
              <Button
                v-if="perm >= 2"
                text-label="Novo Cadastro"
                class="px-6 py-2"
              />
            </NuxtLink>
          </div>
          <div class="flex justify-end">
            <input
              v-model="searchQuery"
              class="w-full form-control"
              type="text"
              placeholder="Pesquise aqui"
            />
          </div>
          <div v-if="sortedItems.length === 0" class="text-center my-5">
            <p class="warning-no-items">Não possui pessoas cadastradas</p>
          </div>
          <div
            v-for="(person, i) in sortedItems"
            v-else
            :key="i"
            class="card flex justify-between items-center bg-primary-light"
          >
            <p class="font-regular">{{ person.name }}</p>
            <NuxtLink
              :to="{ name: 'cadastro-unico-id', params: { id: person.id } }"
            >
              <OutlineButton label="Exibir" />
            </NuxtLink>
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
                v-for="(page, i) in totalPages"
                :key="i"
                class="number-page"
                :class="i + 1 === currentPage ? 'active' : ''"
                @click.prevent="goToPage(i)"
              >
                {{ i + 1 }}
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Button from '~/components/Buttons/Button.vue'
import OutlineButton from '@/components/Buttons/OutlineButton.vue'

export default {
  name: 'CadastroUnico',
  components: {
    Button,
    OutlineButton,
  },
  layout: 'admin',
  middleware: 'role',
  async asyncData({ $auth, route }) {
    const firstPath = route.path.split('/')[1].replace('-', '')
    const res = await $auth.user.UserAttributes.Permissions.filter((item) => {
      return firstPath
        .toLowerCase()
        .split(' ')
        .every((v) => item.name.toLowerCase().includes(v))
    })

    const perm = res[0].permission
    return { perm }
  },
  data() {
    return {
      searchQuery: null,
      pageSize: 5,
      currentPage: 1,
      tabs: [],
    }
  },
  computed: {
    ...mapState('persons', ['persons', 'loading']),
    gettersusers() {
      return this.$store.getters.allPersons
    },
    totalPages() {
      const pages = this.persons.length / this.pageSize
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
        return this.persons.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.persons.filter((row, index) => {
          const start = (this.currentPage - 1) * this.pageSize
          const end = this.currentPage * this.pageSize
          if (index >= start && index < end) return true
          return false
        })
      }
    },
  },
  mounted() {
    this.$store.commit('drawer/SET_TABS', this.tabs)
    this.$store.dispatch('persons/get')
  },
  methods: {
    nextPage() {
      if (this.currentPage * this.pageSize < this.persons.length)
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
