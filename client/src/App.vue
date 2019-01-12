<template>
  <v-app :dark="darkMode">
    <v-content >
      <router-view></router-view>

      <v-snackbar
        v-model="snackbar"
        :right="true"
        :bottom="true"
        :timeout="2000"
        :color="snackbarColor"
      >{{ snackbarText }}</v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters([
      'snackbarText',
      'snackbarColor',
      'darkMode'
    ]),
    snackbar: {
      get () {
        return this.$store.getters.snackbar
      },
      set (value) {
        this.$store.commit('set_snackbar', value)
      }
    }
  }
}
</script>
