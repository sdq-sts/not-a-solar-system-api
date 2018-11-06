<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <RegisterProductForm
          @registerProduct="submitRegisterProductForm"
          @formIsReset="changeState"
          :color="appMainColor"
          :isDarkColor="isDarkTheme"
          :loading="loading"
          :clearForm="clearForm"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import RegisterProductForm from '@/components/RegisterProductForm'

export default {
  components: { RegisterProductForm },
  data: () => ({
    loading: false,
    clearForm: false,
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
    successText: 'Produto cadastrado',
    failText: 'Não foi possível cadastrar produto',
    successColor: 'success',
    failColor: 'error'
  }),

  computed: {
    ...mapGetters(['appMainColor', 'isDarkTheme'])
  },

  methods: {
    async submitRegisterProductForm (payload) {
      this.loading = true
      const result = await this.$store.dispatch('submitRegisterProductForm', payload)
      result.status === 201 ? this.registerSuccess() : this.registerFail()
    },
    registerSuccess () {
      const color = this.successColor
      const text = this.successText
      this.$store.dispatch('showSnackbar', { color, text })
      this.clearForm = true
      this.loading = false
    },
    registerFail () {
      const color = this.failColor
      const text = this.failText
      this.$store.dispatch('showSnackbar', { color, text: `${text}` })
      this.loading = false
    },
    changeState (v) {
      this.clearForm = false
    }
  }
}
</script>

<style>

</style>
