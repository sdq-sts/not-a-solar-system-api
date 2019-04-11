<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary clipped>
      <TheWrapperDrawer/>
    </v-navigation-drawer>

    <v-toolbar
      clipped-left
      color="secondary"
      dark
      app
      fixed
    >
      <v-toolbar-title class="ml-0 mr-5 pl-0">
        <v-toolbar-side-icon @click="handleDrawerState"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down" v-text="company"></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu
        transition="slide-y-transition"
        :close-on-content-click="false"
        bottom
      >
        <v-btn slot="activator" icon large>
          <v-avatar size="32px">
            <v-img :src="avatar"></v-img>
          </v-avatar>
        </v-btn>

        <LogoutCard
          :username="username"
          :userPictureUrl="avatar"
          :logoutAction="logout"
          :dark="darkMode"
          @setDarkTheme="handleLogoutCardTheme"
          color="primary"
        />
      </v-menu>

    </v-toolbar>

    <slot></slot>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheWrapperDrawer from '@/components/Shared/TheWrapperDrawer'
import LogoutCard from '@/components/Shared/LogoutCard'

export default {
  components: { TheWrapperDrawer, LogoutCard },

  data: () => ({
    dialog: false,
    drawer: false
  }),

  computed: {
    ...mapGetters([
      'company',
      'username',
      'userAvatar',
      'darkMode',
      'defaultAvatar'
    ]),
    avatar () {
      return this.userAvatar || this.defaultAvatar
    }
  },

  methods: {
    ...mapActions(['editUser']),
    async logout () {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    },
    handleDrawerState () {
      this.drawer = !this.drawer
    },
    async handleLogoutCardTheme (value) {
      if (value) {
        await this.editUser({ darkMode: true })
        this.$store.commit('SET_DARK_MODE', true)
      } else {
        await this.editUser({ darkMode: false })
        this.$store.commit('SET_DARK_MODE', false)
      }
    }
  }
}
</script>

<style>

</style>
