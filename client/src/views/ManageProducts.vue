<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-btn large color="primary" dark @click="dialog = true">CADASTRAR PRODUTO</v-btn>

        <v-dialog width="800" persistent v-model="dialog" no-click-animation>
          <v-card>
            <v-container grid-list-xl>
              <RegisterProductForm
                @registerProduct="submitRegisterProductForm"
                @formIsReset="changeState"
                @cancel="closeFormDialog"
                :color="appMainColor"
                :isDarkColor="isDarkTheme"
                :loading="loading"
                :clearForm="clearForm"
              />
            </v-container>
          </v-card>
        </v-dialog>

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
    failColor: 'error',
    dialog: false
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
    changeState () {
      this.clearForm = false
    },
    closeFormDialog () {
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
