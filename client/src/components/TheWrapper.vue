<template>
  <div>
    <v-navigation-drawer clipped v-model="drawer" fixed app>
      <TheWrapperDrawerList/>
    </v-navigation-drawer>

    <v-toolbar
      clipped-left
      color="primary"
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
        bottom
      >
        <v-btn slot="activator" icon large>
          <v-avatar size="32px" tile>
            <img :src="defaultAvatar" >
          </v-avatar>
        </v-btn>

        <LogoutCard
          :username="username"
          :userPictureUrl="avatar"
          color="primary"
          :logoutAction="logout"
        />
      </v-menu>

    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <slot></slot>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import TheWrapperDrawerList from '@/components/TheWrapperDrawerList'
import LogoutCard from '@/components/LogoutCard'
import defaultAvatar from '@/assets/default_avatar.png'
import { mapGetters } from 'vuex'

export default {
  components: { TheWrapperDrawerList, LogoutCard },

  data: () => ({
    dialog: false,
    drawer: false,
    defaultAvatar
  }),

  computed: {
    ...mapGetters([ 'company', 'username', 'userAvatar' ]),
    avatar () {
      return this.userAvatar || defaultAvatar
    }
  },

  methods: {
    handleDrawerState () {
      this.drawer = !this.drawer
    },
    async logout () {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
