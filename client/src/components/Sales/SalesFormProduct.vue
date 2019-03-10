<template>
  <v-card class="mb-3">
    <v-container>
      <v-layout row wrap>
        <v-flex xs6>
          <v-combobox
            v-model="product"
            :rules="rules.search"
            :items="items"
            :label="labels.item"
            :search-input.sync="search"
            @change="update"
            :loading="loading"
            clearable
            dense
          ></v-combobox>
        </v-flex>

        <v-flex>
          <v-text-field
            v-model="amount"
            :label="labels.amount"
            :rules="[ validadeMinAmount, validadeMaxAmount ]"
            type="number"
            :max="currentStorage"
            min="1"
            @input="update"
            reverse
          ></v-text-field>
        </v-flex>

        <v-flex>
          <v-layout justify-center align-end fill-height column>
            <p class="ma-0 mt-2 caption" style="color: #AFAFAF">Em estoque</p>
            <p class="ma-0 headline">{{ currentStorage }}</p>
          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout justify-center align-end fill-height column>
            <p class="ma-0 mt-2 caption" style="color: #AFAFAF">Valor unitário</p>
            <p class="ma-0 headline">{{ cost | currencyBRL }}</p>
          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout justify-center align-end fill-height column>
            <p class="ma-0 mt-2 caption" style="color: #AFAFAF">Total</p>
            <p class="ma-0 headline">{{ total | currencyBRL }}</p>
          </v-layout>
        </v-flex>

        <v-flex align-self-center class="text-xs-right">
          <v-icon
            style="cursor: pointer;"
            @click="removeItem"
          >close</v-icon>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    value: {
      type: Object
    },
    label: {
      type: String,
      default: 'Item'
    }
  },

  data: () => ({
    loading: false,
    item: null,
    search: '',
    product: '',
    amount: 1,
    cost: 0,
    items: [],
    labels: {
      storage: 'Estoque',
      item: 'Produto',
      amount: 'Quantidade',
      cost: 'Custo unitário',
      total: 'Custo total'
    },
    rules: {
      search: [
        (v) => !!(v && v.text) || 'Campo inválido'
      ]
    }
  }),

  watch: {
    search: {
      handler: 'watchSearch'
    },
    value: {
      handler: 'watchValue'
    }
  },

  computed: {
    total () {
      return this.cost * this.amount
    },
    currentStorage () {
      return ((this.product || {}).item || {}).currentStorage || 0
    }
  },

  methods: {
    ...mapActions('products', [ 'fetchProducts' ]),
    async watchSearch (search) {
      if (search) {
        this.loading = true
        const products = await this.fetchProducts({ search })

        this.items = products.map((product) => ({ text: product.name, item: product }))
        this.loading = false
      } else {
        this.items = []
      }
    },
    watchValue (v) {
      if (v.salePrice <= 0) {
        this.cost = 0
      }
    },
    update (value) {
      const { product, amount } = this
      const productId = ((product || {}).item || {})._id
      const productAmount = parseFloat(amount) || 0
      const productSalePrice = ((product || {}).item || {}).salePrice
        ? parseFloat(product.item.salePrice)
        : 0

      this.cost = productSalePrice
      this.$emit('input', {
        product: productId,
        amount: productAmount,
        salePrice: productSalePrice
      })
    },
    removeItem (e) {
      this.$emit('removeItem', e)
    },
    validadeMinAmount (value) {
      if ((this.product || {}).item) {
        return (value >= 1) || `Mínimo 1`
      }

      return true
    },
    validadeMaxAmount (value) {
      if ((this.product || {}).item) {
        return (value <= this.currentStorage) || `Máximo ${this.currentStorage}`
      }

      return true
    }
  }
}
</script>

<style>

</style>
