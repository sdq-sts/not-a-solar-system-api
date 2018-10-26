<template>
  <v-container fluid fill-height class="pa-0">
    <v-layout align-center justify-center row fill-height>
      <v-flex xs3>
        <RegisterForm
          @submitRegisterForm="submitRegisterForm"
          @clearFormAlerts="clearFormAlerts"
        />

        <v-alert
          class="mt-2"
          :value="alert"
          :type="alertType"
          transition="slide-y-reverse-transition"
        >{{ alertText }}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RegisterForm from '@/components/RegisterForm'

export default {
  data: () => ({
    alert: false,
    alertText: '',
    alertType: 'success'
  }),

  methods: {
    async submitRegisterForm (payload) {
      const result = await this.$store.dispatch('submitRegisterForm', payload)
      const error = result.response ? result.response : false

      if (error && error.status === 422) {
        this.showAlert('Houve um problema ao cadastrar o usuário', 'error')
      } else if (result.status === 201) {
        this.showAlert('Usuário cadastrado com sucesso', 'success')
        this.redirectToLoginPage()
      }
    },
    showAlert (text, type) {
      this.alertText = text
      this.alertType = type
      this.alert = true
    },
    redirectToLoginPage (time = 1500) {
      setTimeout(() => { this.$router.push({ name: 'login' }) }, time)
    },
    clearFormAlerts () {
      this.alert = false
    }
  },

  components: {
    RegisterForm
  }
}
</script>

<style>

</style>
