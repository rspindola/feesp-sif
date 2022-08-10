<template>
  <div class="relative min-h-screen md:flex">
    <!-- mobile menu bar -->
    <div class="bg-primary-dark text-white flex justify-between md:hidden">
      <!-- logo -->
      <div class="block p-4" @click="toggleSidebar">
        <img src="@/static/icons/menu.svg" alt="Logo" />
      </div>

      <!-- mobile menu button -->
      <button
        class="mobile-menu-button p-4 focus:outline-none focus:bg-primary-regular"
        @click="toggleSidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <!-- nav -->
    </div>
    <!-- sidebar -->
    <div
      :class="[sidebarOpen ? '' : '-translate-x-full']"
      class="sidebar w-64 space-y-6 pt-6 pb-3 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out"
    >
      <div class="top">
        <div class="logo-box mb-6">
          <NuxtLink :to="{ name: 'index' }">
            <img src="@/static/images/logo-white.svg" alt="Logo" />
          </NuxtLink>
        </div>
        <nav>
          <div v-for="(item, i) in menu" :key="i" class="nav-item">
            <NuxtLink
              :event="havePermision(item.to) ? 'click' : ''"
              :to="{ name: item.to }"
              class="text-white block py-4 px-4"
              :class="!havePermision(item.to) ? 'disabled' : ''"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </nav>
      </div>
      <div class="bottom text-white">
        <NuxtLink
          v-if="havePermision('ajustes')"
          :to="{ name: 'ajustes' }"
          class="block py-3"
        >
          <div class="flex center-items px-4">
            <img
              src="@/static/icons/settings.svg"
              class="mr-1"
              alt="Profile image"
            />
            Ajustes
          </div>
        </NuxtLink>
        <div>
          <a
            class="text-white block py-4 px-4"
            href="javascript:void(0)"
            @click="$auth.logout()"
          >
            Sair
          </a>
        </div>
        <p class="copyright mt-3">
          Desenvolvido por Groove.Tech <br />
          suporte.ocoe@groove.tech
        </p>
      </div>
    </div>
    <!-- content -->
    <div class="flex-1 text-2x1">
      <div class="flex justify-between items-center p-5 topbar">
        <div class="flex items-center">
          <div v-for="(tab, i) in tabs" :key="i">
            <NuxtLink
              :to="{ name: tab.route }"
              class="text-primary-regular block py-4 px-4"
            >
              {{ tab.label }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center justify-end">
          <div
            class="container-avatar flex items-center text-primary-light"
            @click="goToProfile()"
          >
            <div class="mx-3">{{ userLogged.UserAttributes.Name }}</div>
            <avatar :username="userLogged.UserAttributes.Name"></avatar>

            <!-- <img
              class="inline object-cover rounded-full"
              :src="userLogged.UserAttributes.Profile_pic || '/avatar.png'"
              alt="Profile image"
            /> -->
          </div>
        </div>
      </div>
      <Nuxt class="content bg-greyishblue-lightest p-10" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Avatar from 'vue-avatar'

export default {
  name: 'AdminLayout',
  components: {
    Avatar,
  },
  middleware: 'auth',
  data() {
    return {
      permsUser: [],
    }
  },
  computed: {
    ...mapState('drawer', ['sidebarOpen', 'menu', 'tabs', 'userLogged']),
  },
  async beforeCreate() {
    this.$store.commit('drawer/SET_USER_LOGGED', this.$auth.user)
    await this.$auth.user.UserAttributes.Permissions
    if (this.$auth.user.UserAttributes.Permissions) {
      // eslint-disable-next-line array-callback-return
      this.$auth.user.UserAttributes.Permissions.map((obj) => {
        this.permsUser.push(obj.name.toLowerCase())
      })
    }
  },
  methods: {
    ...mapActions('drawer', ['toggleSidebar']),
    goToProfile() {
      this.$router.push('/auth/profile')
    },
    havePermision(route) {
      const routeName = route.toLowerCase().replace('-', '')
      return this.permsUser.includes(routeName)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/mixins.scss';

.logo-box {
  height: 54px;
}

.sidebar {
  background: $brand--gradient;
}

.copyright {
  font-size: 0.6rem;
  line-height: 1.2;
}

.sidebar {
  z-index: 2;

  nav,
  .bottom {
    a.nuxt-link-active {
      font-weight: bold;
      color: $white;
      background-color: $primary--light;
      border-left: 5px solid $white;
    }
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.topbar {
  position: relative;
  background-color: $greyishblue--lightest;

  a.nuxt-link-active {
    color: #2867a1;
    border-bottom: 5px solid #2867a1;
  }
}

.box {
  &.notify {
    size: 13px;
    margin-right: 38px;
  }

  &.search {
    margin-right: 28px;
    height: 13px;
    width: 16px;
  }
}

.container-avatar {
  margin-left: 38px;
  cursor: pointer;

  img {
    height: 37px;
    width: 37px;
    margin-left: 1rem;
  }
}

.divider {
  border: 1px solid #cbd5e1;
  position: absolute;
  width: 0px;
  top: 20px;
  bottom: 20px;
  left: auto;
  right: auto;
}

.content {
  min-height: 90vh;
  @include background('@/static/images/logo-bg.svg', 50% 50%);
}
</style>
