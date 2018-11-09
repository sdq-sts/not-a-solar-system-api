<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <v-btn
          @click="dialog = true"
          class="ma-0"
          color="primary"
          small
          dark
        >CADASTRAR</v-btn>

        <v-dialog width="800" persistent v-model="dialog" no-click-animation>
          <ProductsRegisterForm
            @registerProduct="submitRegisterProductForm"
            @formIsReset="changeState"
            @cancel="closeFormDialog"
            :color="appMainColor"
            :isDarkColor="isDarkTheme"
            :loading="loading"
            :clearForm="clearForm"
          />
        </v-dialog>
      </v-flex>

      <v-flex xs8 offset-xs2>
        <ProductsList v-if="hasProducts" :productsList="productsList"/>
      </v-flex>

      <v-flex xs8 offset-xs2>
        <v-layout justify-center>
          <v-pagination
            class="mt-2"
            :color="appMainColor"
            v-model="page"
            :length="productsCount / limit"
            circle
          ></v-pagination>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductsRegisterForm from '@/components/ProductsRegisterForm'
import ProductsList from '@/components/ProductsList'

export default {
  components: { ProductsRegisterForm, ProductsList },
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
    dialog: false,
    page: 1,
    limit: 8
  }),

  watch: {
    page: {
      handler: 'fetchProducts'
    }
  },

  computed: {
    ...mapGetters(['appMainColor', 'isDarkTheme', 'productsList', 'productsCount']),
    hasProducts () {
      return this.productsList.length > 0
    }
  },

  methods: {
    async submitRegisterProductForm (payload) {
      this.loading = true
      const result = await this.$store.dispatch('submitRegisterProductForm', payload)
      result.status === 201 ? this.registerSuccess() : this.registerFail()
    },

    async fetchProducts (page) {
      const limit = this.limit

      await this.$store.dispatch('fetchProducts', { page, limit })
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
  },

  beforeCreate () {
    this.$store.dispatch('fetchProductsMeta')
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
