<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <v-layout row>
          <v-flex xs2 offset-xs10>
            <v-btn
              @click="registerProduct"
              class="ma-0"
              color="primary"
              dark
              block
            >{{ registerProductBtnText }}</v-btn>
          </v-flex>
        </v-layout>

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
              <product-form
                :productToEdit="productToEdit"
                :color="appMainColor"
                :isDarkTheme="isDarkTheme"
                :clearForm="clearForm"
                :isLoading="loadingForm"
                :focusForm="dialog"
                @cancel="closeDialog"
                @submitEditForm="submitEditForm"
                @submitRegisterForm="submitRegisterForm"
              >
                <UploadFile
                  slot="img-upload"
                  :clear="clearForm"
                  :imgUrl="productImg"
                  :defaultImgUrl="defaultProductImg"
                  @fileAdded="fileAdded"
                />
              </product-form>
            </v-container>
          </v-card>
        </v-dialog>
      </v-flex>

      <v-flex xs8 offset-xs2>
        <ProductsList
          v-if="hasProducts"
          :productsList="products"
          @editItem="editProduct"
          @deleteItem="openDeleteDialog"
        />
        <h2 v-else class="headline text-xs-center">{{ noProductMsg }}</h2>
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
import { mapGetters, mapActions } from 'vuex'
import ProductsList from '@/components/Products/ProductsList'
import ProductDelete from '@/components/Products/ProductDelete'
import ProductForm from '@/components/Products/ProductForm'
import UploadFile from '@/components/UploadFile'
import defaultProductImg from '@/assets/img-not-available.png'

export default {
  components: { ProductsList, ProductDelete, ProductForm, UploadFile },
  data: () => ({
    defaultProductImg,
    file: null,
    loadingForm: false,
    clearForm: false,
    snackbar: false,
    snackbarText: '',
    snackbarColor: '',
    registerProductBtnText: 'cadastrar',
    successText: 'Produto cadastrado',
    failText: 'Não foi possível cadastrar produto',
    deleteErrorMsg: 'Não foi possível excluir o item',
    noProductMsg: 'Você ainda não tem nenhum produto cadastrado, clique no botão de cadastro e adicione seu primeiro produto.',
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
      handler: 'getProducts'
    }
  },

  computed: {
    ...mapGetters([
      'appMainColor',
      'isDarkTheme',
      'getImage'
    ]),
    ...mapGetters('products', [
      'products',
      'productsCount'
    ]),
    productImg () {
      const hasProdutcToEdit = (this.productToEdit && this.productToEdit.image)

      if (hasProdutcToEdit) {
        return this.getImage(this.productToEdit.image)
      } else {
        return ''
      }
    },
    hasProducts () {
      return this.products ? this.products.length > 0 : false
    }
  },

  methods: {
    ...mapActions([
      'uploadFile',
      'showSnackbar',
      'requestFileUploadUrl'
    ]),
    ...mapActions('products', [
      'fetchProducts',
      'fetchProductsMeta',
      'deleteProduct',
      'createProduct',
      'updateProduct'
    ]),
    async submitEditForm (payload) {
      const file = this.file
      let product = payload

      if (file) {
        const { data: res } = await this.requestFileUploadUrl({ fileType: file.type, folder: 'products' })

        await this.uploadFile({ url: res.url, file })
        product = { ...payload, image: res.key }
      }

      try {
        await this.updateProduct(product)

        this.showSnackbar({ color: 'success', text: `Produto editado` })
        this.fetchProductsMeta()
        this.fetchProducts()
        this.productToEdit = null
        this.dialog = false
      } catch (error) {
        this.showSnackbar({ color: 'danger', text: `Erro ao editar o produto` })
      }
    },
    async submitRegisterForm (payload) {
      const file = this.file
      let product = payload

      if (file) {
        const { type: fileType } = file
        const { data: res } = await this.requestFileUploadUrl({ fileType, folder: 'products' })
        await this.uploadFile({ url: res.url, file })
        product = { ...payload, image: res.key }
      }

      try {
        await this.createProduct(product)

        this.fetchProductsMeta()
        this.fetchProducts()
        this.clearForm = true
        this.productToEdit = null
        this.$nextTick(() => { this.clearForm = false })
        this.showSnackbar({ color: 'success', text: `Produto cadastrado` })
      } catch (error) {
        this.showSnackbar({ color: 'danger', text: `Erro ao cadastrar produto` })
      }
    },
    async confirmDeletion (payload) {
      try {
        await this.deleteProduct(payload)

        this.fetchProductsMeta()
        this.fetchProducts()
        this.dialogDelete = false
      } catch (error) {
        this.showSnackbar({ text: 'Erro ao excluir produto', color: 'error' })
      }
    },
    getProducts (page) {
      const limit = this.limit

      this.fetchProducts({ page, limit })
    },
    openDeleteDialog (payload) {
      this.productToDelete = payload
      this.dialogDelete = true
    },
    fileAdded (file) {
      this.file = file
    },
    closeDeleteDialog () {
      this.dialogDelete = false
    },
    closeDialog () {
      this.dialog = false
    },
    editProduct (payload) {
      this.productToEdit = payload
      this.dialog = true
    },
    registerProduct () {
      this.productToEdit = null
      this.dialog = true
    }
  },

  beforeCreate () {
    this.$store.dispatch('products/fetchProductsMeta')
    this.$store.dispatch('products/fetchProducts')
  }
}
</script>

<style>

</style>
