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

      <v-snackbar
        v-model="snackbar"
        multi-line="multi-line"
        :right="true"
        :bottom="true"
        :timeout="2000"
        :color="snackbarColor"
      >{{ snackbarText }}
      </v-snackbar>
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

      try {
        const result = await this.$store.dispatch('submitRegisterProductForm', payload)
        console.log(result)
        this.snackbarText = this.successText
        this.snackbarColor = this.successColor
        this.snackbar = true
        this.loading = false
        this.clearForm = true
      } catch (error) {
        this.snackbarText = this.failText
        this.snackbarColor = this.failColor
        this.snackbar = true
        this.loading = false
        console.log(error)
      }
    },
    changeState (v) {
      this.clearForm = false
    }
  }
}
</script>

<style>

</style>
