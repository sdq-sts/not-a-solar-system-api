<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-flex xs7>
        <v-layout column>
        <SearchProducts
          :items="items"
          :loading="loadingSearch"
          @change="onSearchChange"
          @search="onSearch"
        />
        <ProductPreview :product="chosenProduct"/>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import SearchProducts from '@/components/Sales/SearchProducts'
import ProductPreview from '@/components/Sales/ProductPreview'

export default {
  components: {
    SearchProducts,
    ProductPreview
  },

  data: () => ({
    items: [],
    loadingSearch: false,
    debounceSearchDelay: 500,
    chosenProduct: null
  }),

  computed: {},

  methods: {
    ...mapActions([ 'showSnackbar' ]),
    ...mapActions('sales', [ 'createSale' ]),
    ...mapActions('products', [ 'fetchProducts' ]),
    onSearch: debounce(async function (search) {
      this.loadingSearch = true

      try {
        const products = await this.fetchProducts({ search })
        this.items = products.map((product) => ({ text: product.name, item: product }))
        this.loadingSearch = false
      } catch (error) {
        this.loadingSearch = false
        this.showSnackbar({ color: 'error', text: 'Erro ao buscar produtos' })
      }
    }, 1000),
    onSearchChange (v) {
      const arrText = this.items.map(x => x.text)
      const includedInItems = arrText.includes(v.text)

      if (includedInItems) {
        console.log(v)
      }
    }
  }
}
</script>

<style>

</style>
