<template>
  <v-container fluid fill-height class="pa-0">
    <v-layout align-center justify-center row fill-height>
      <v-flex xs3>
        <LoginForm @submitLoginForm="submitLoginForm"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  data: () => ({
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
