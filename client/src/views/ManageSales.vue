<template>
  <v-container grid-list-xl @keydown.alt.n="addProduct">
    <v-layout row>
      <v-flex xs8>
        <v-form v-model="isValid" ref="form" @submit.prevent="submitForm">
          <v-layout row wrap justify-end>
            <v-flex xs12 class="text-xs-right">
              <v-btn
                tabindex="-1"
                class="ma-0"
                color="primary"
                @click="addProduct"
              >{{ text.addProduct }}</v-btn>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12>
              <transition-group name="list">
                <SalesFormProduct
                  v-model="products[i]"
                  v-for="(p, i) in products"
                  :key="i"
                  @removeItem="removeProduct(i)"
                />
              </transition-group>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>

      <v-flex xs4>
        <SaleSummary
          :loading="loading"
          :total="productsTotal"
          @clear="clearForm"
          @submit="submitForm"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import SalesFormProduct from '@/components/Sales/SalesFormProduct'
import SaleSummary from '@/components/Sales/SaleSummary'

export default {
  components: {
    SalesFormProduct,
    SaleSummary
  },
  data: () => ({
    loading: false,
    isValid: false,
    received: 0,
    products: {
      '0': { product: '', amount: 1, salePrice: 0 }
    },
    labels: {
      receivedValue: 'Valor recebido'
    },
    text: {
      addProduct: 'Adicionar produto',
      confirm: 'Confirmar',
      clear: 'Limpar'
    }
  }),

  computed: {
    productsTotal () {
      const reducer = (x, y) => (y.amount * y.salePrice) + x
      const productsTotal = Object.values(this.products).reduce(reducer, 0)

      return productsTotal
    },
    change () {
      return this.received - this.productsTotal
    }
  },

  methods: {
    ...mapActions([ 'showSnackbar' ]),
    ...mapActions('sales', [ 'createSale' ]),
    ...mapActions('products', [ 'fetchProducts' ]),
    async watchSearch (search) {
      if (search) {
        const products = await this.fetchProducts({ search })
        this.items = products.map((product) => ({ text: product.name, item: product }))
      }
    },
    removeProduct (index) {
      const hasMoreThanOneItem = Object.keys(this.products).length > 1

      if (hasMoreThanOneItem) {
        this.$delete(this.products, `${index}`)
      }
    },
    addProduct () {
      const newProduct = { product: '', amount: 1, salePrice: 0 }
      const nextIndex = Math.max(...Object.keys(this.products)) + 1
      this.$set(this.products, `${nextIndex}`, newProduct)
    },
    clearForm () {
      this.$refs.form.reset()
      this.products = {
        '0': { product: '', amount: 1, salePrice: 0 }
      }
    },
    async submitForm () {
      const products = Object.values(this.products)
      const payload = JSON.stringify({ products })

      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          await this.createSale(payload)
          this.showSnackbar({ color: 'success', text: `Venda realizada com sucesso` })
          this.clearForm()
          this.loading = false
        } catch (error) {
          this.showSnackbar({ color: 'danger', text: `Houve um problema ao realizar a venda` })
          this.loading = false
        }
      }
    },
    gteProductsTotal (value) {
      return value >= this.productsTotal || 'Valor muito baixo'
    }
  }
}
</script>

<style>
.list-item {
  display: inline-block;
}
.list-enter-active, .list-leave-active {
  transition: all .4s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
