<template>
  <v-container grid-list-xl @keydown.prevent.alt.n="addProduct">
    <v-flex xs8 offset-xs2>
      <v-form v-model="isValid" ref="form" @submit.prevent="submitForm">

          <v-layout row wrap>
            <v-flex>
              <SalesFormProduct
                v-model="products[i]"
                v-for="(p, i) in products"
                :key="i"
                @removeItem="removeProduct(i)"
              />
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex>
              <v-layout row wrap justify-end>
                <v-btn
                  tabindex="-1"
                  color="primary"
                  @click="addProduct"
                  small
                >{{ text.addProduct }}</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout row wrap align-content-center justify-space-between>
            <v-flex xs2>
              <v-text-field
                v-model="received"
                :label="labels.receivedValue"
                :rules="[ gteProductsTotal ]"
                type="number"
                min="0"
              ></v-text-field>
            </v-flex>

            <v-flex align-self-center>
              <p
                v-if="change > 0"
                class="headline text-xs-right ma-0"
              >TROCO {{ change | currencyBRL }}</p>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-space-between>
            <v-flex>
              <p class="heading display-2 text-xs-left">TOTAL</p>
            </v-flex>

            <v-flex grow align-self-center>
              <p class="heading display-2 text-xs-right">{{ productsTotal | currencyBRL }}</p>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-space-between>
            <v-btn
              @click="clearForm"
              large
              flat
            >{{ text.clear }}</v-btn>

            <v-btn
              color="primary"
              @click="submitForm"
              large
              :loading="loading"
            >{{ text.confirm }}</v-btn>
          </v-layout>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import SalesFormProduct from '@/components/Sales/SalesFormProduct'

export default {
  components: {
    SalesFormProduct
  },
  data: () => ({
    loading: false,
    isValid: false,
    received: 0,
    products: {
      '1': { product: '', amount: 1, salePrice: 0 }
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
      this.products = {}
      this.$set(this.products, `0`, { product: '', amount: 1, salePrice: 0 })
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

</style>
