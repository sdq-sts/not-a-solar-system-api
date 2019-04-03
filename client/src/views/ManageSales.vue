<template>
  <v-container grid-list-xl>
    <v-layout row>
      <v-flex xs7>
        <v-layout column>
          <v-flex>
            <SearchProducts
              ref="search"
              :items="items"
              :loading="loadingSearch"
              @change="onSearchChange"
              @search="onSearch"
            />
          </v-flex>

          <v-flex>
            <ProductPreview
              :product="product"
              :defaultImage="defaultProductImg"
              @addProduct="addProductToList"
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs5>
        <SalePreview
          :products="products"
          :loading="loadingSale"
          @remove="removeItem"
          @clear="clearSale"
          @confirm="confirmSale"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapGetters, mapActions } from 'vuex'
import SearchProducts from '@/components/Sales/SearchProducts'
import ProductPreview from '@/components/Sales/ProductPreview'
import SalePreview from '@/components/Sales/SalePreview'
import defaultProductImg from '@/assets/img-not-available.png'

export default {
  components: {
    SearchProducts,
    ProductPreview,
    SalePreview
  },

  data: () => ({
    defaultProductImg,
    items: [],
    loadingSearch: false,
    loadingSale: false,
    debounceSearchDelay: 500,
    product: null,
    products: []
  }),

  computed: {
    ...mapGetters([ 'getImage' ])
  },

  methods: {
    ...mapActions([ 'showSnackbar' ]),
    ...mapActions('sales', [ 'createSale' ]),
    ...mapActions('products', [ 'fetchProducts' ]),
    onSearch: debounce(async function (search) {
      this.loadingSearch = true

      if (search) {
        try {
          const products = await this.fetchProducts({ search, limit: 7 })
          this.items = products.map((product) => ({ text: product.name, item: product }))
          this.loadingSearch = false
        } catch (error) {
          this.loadingSearch = false
          this.showSnackbar({ color: 'error', text: 'Erro ao buscar produtos' })
        }
      }
    }, 700),
    onSearchChange (product) {
      const arrText = this.items.map(x => x.text)
      const includedInItems = arrText.includes(product.text)

      if (includedInItems) {
        const image = product.item.image
          ? this.getImage(product.item.image)
          : ''
        this.product = { ...product.item, image }
      }
    },
    addProductToList (product) {
      this.products = [ ...this.products, product ]
      this.product = null
      this.focusSearch()
    },
    focusSearch () {
      setTimeout(() => {
        this.$refs.search.focus()
      }, 0)
    },
    clearSale () {
      this.products = []
      this.focusSearch()
    },
    removeItem (product) {
      this.products = this.products.filter((x, y) => y !== product.index)
      this.showSnackbar({ color: 'primary', text: `${product.item.name} foi removido.` })
    },
    async confirmSale (products) {
      this.loadingSale = true

      try {
        await this.createSale({ products })
        this.showSnackbar({ color: 'success', text: 'Venda realizada com sucesso' })
        this.loadingSale = false
        this.products = []
        this.focusSearch()
      } catch (error) {
        this.showSnackbar({ color: 'error', text: 'Houve um problema ao criar venda' })
        this.loadingSale = false
      }
    }
  }
}
</script>

<style>

</style>
