<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <v-btn
          @click="registerProduct"
          class="ma-0"
          color="primary"
          dark
        >CADASTRAR</v-btn>

        <v-dialog width="400" persistent v-model="dialogDelete" no-click-animation>
          <ProductDelete
            :product="productToDelete"
            @cancel="closeDeleteDialog"
            @confirm="confirmDeletion"
          />
        </v-dialog>

        <v-dialog width="900" persistent v-model="dialog" no-click-animation lazy>
          <v-card>
            <v-container grid-list-lg>
              <ProductForm
                :productToEdit="productToEdit"
                :color="appMainColor"
                :isDarkTheme="isDarkTheme"
                :clearForm="clearForm"
                :isLoading="loadingForm"
                :focusForm="dialog"
                @cancel="closeDialog"
                @submitEditForm="submitEditForm"
                @submitRegisterForm="submitRegisterForm"
              />
            </v-container>
          </v-card>
        </v-dialog>
      </v-flex>

      <v-flex xs8 offset-xs2>
        <ProductsList
          v-if="hasProducts"
          :productsList="productsList"
          @editItem="editProduct"
          @deleteItem="openDialogDelete"
        />
      </v-flex>

      <v-flex xs8 offset-xs2>
        <v-layout justify-center>
          <v-pagination
            v-if="Math.ceil(productsCount / limit)"
            class="mt-2"
            :color="appMainColor"
            v-model="page"
            :length="Math.ceil(productsCount / limit)"
            circle
          ></v-pagination>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductsList from '@/components/ProductsList'
import ProductDelete from '@/components/ProductDelete'
import ProductForm from '@/components/ProductForm'

export default {
  components: { ProductsList, ProductDelete, ProductForm },
  data: () => ({
    loadingForm: false,
    clearForm: false,
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
    successText: 'Produto cadastrado',
    failText: 'Não foi possível cadastrar produto',
    deleteErrorMsg: 'Não foi possível excluir o item',
    successColor: 'success',
    failColor: 'error',
    dialog: false,
    dialogAdd: false,
    dialogDelete: false,
    dialogEdit: false,
    productToDelete: {},
    productToEdit: null,
    page: 1,
    limit: 3
  }),

  watch: {
    page: {
      handler: 'fetchProducts'
    }
  },

  computed: {
    ...mapGetters([
      'appMainColor',
      'isDarkTheme',
      'productsList',
      'productsCount'
    ]),
    hasProducts () {
      return  this.productsList
        ? this.productsList.length > 0
        : false
    }
  },

  methods: {
    async fetchProducts (page) {
      const limit = this.limit

      this.$store.dispatch('fetchProducts', { page, limit })
    },

    async confirmDeletion (payload) {
      try {
        await this.$store.dispatch('deleteProduct', payload)
        this.$store.dispatch('fetchProductsMeta')
        this.$store.dispatch('fetchProducts')
        this.dialogDelete = false
      } catch (error) {
        this.$store.dispatch('showSnackbar', { text: 'Erro ao excluir produto', color: 'error' })
      }
    },
    openDialogDelete (payload) {
      this.productToDelete = payload
      this.dialogDelete = true
    },
    closeDeleteDialog () {
      this.dialogDelete = false
    },
    closeDialog () {
      this.dialog = false
    },
    editProduct (payload) {
      this.dialog = true
      this.productToEdit = payload
    },
    registerProduct () {
      this.productToEdit = null
      this.dialog = true
    },
    async submitEditForm (payload) {
      try {
        await this.$store.dispatch('editProduct', payload)
        this.$store.dispatch('showSnackbar', { color: 'success', text: `Produto editado` })
        this.$store.dispatch('fetchProductsMeta')
        this.$store.dispatch('fetchProducts')
        this.productToEdit = null
        this.dialog = false
      } catch (error) {
        this.$store.dispatch('showSnackbar', { color: 'danger', text: `Erro ao editar o produto` })
      }
    },
    async submitRegisterForm (payload) {
      try {
        await this.$store.dispatch('createProduct', payload)
        this.$store.dispatch('showSnackbar', { color: 'success', text: `Produto cadastrado` })
        this.$store.dispatch('fetchProductsMeta')
        this.$store.dispatch('fetchProducts')
        this.productToEdit = null
      } catch (error) {
        this.$store.dispatch('showSnackbar', { color: 'danger', text: `Erro ao cadastrar produto` })
      }
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
