<template>
  <v-container fluid fill-height class="pa-0">
    <v-layout align-center justify-center row fill-height>
      <v-flex xs3>
        <v-layout row wrap>
          <v-flex xs12>
            <LoginForm @submitLoginForm="submitLoginForm"/>
          </v-flex>
          <v-flex xs12>
            <p class="text-xs-center mt-3">Se você não possui uma conta, <router-link :to="{ name: registerLink }">crie uma aqui</router-link></p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from '@/components/Auth/LoginForm'

export default {
  data: () => ({
    registerLink: 'register'
  }),

  methods: {
    async submitLoginForm (payload) {
      const result = await this.$store.dispatch('submitLoginForm', payload)
      const nextUrl = this.$route.params.nextUrl ? this.$route.params.nextUrl : '/dashboard'

      result ? this.$router.push(nextUrl) : this.$router.push('/login')
    }
  },

  components: { LoginForm }
}
</script>

<style>

</style>
