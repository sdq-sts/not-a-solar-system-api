<template>
  <v-layout row wrap>
    <v-flex xs5>
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

    <v-flex xs1>
      <v-text-field
        v-model="amount"
        :label="labels.amount"
        :rules="[ lteStorage ]"
        type="number"
        :max="currentStorage"
        min="1"
        @input="update"
      ></v-text-field>
    </v-flex>

    <v-flex xs1>
      <v-text-field
        :label="labels.storage"
        :value="currentStorage"
        type="number"
        readonly
      ></v-text-field>
    </v-flex>

    <v-flex xs2>
      <v-text-field
        :value="cost | currencyBRL"
        :label="labels.cost"
        @input="update"
        tabindex="-1"
        readonly
        reverse
      ></v-text-field>
    </v-flex>

    <v-flex xs2>
      <v-text-field
        :value="total | currencyBRL"
        :label="labels.total"
        class="text-xs-center"
        tabindex="-1"
        readonly
        reverse
      ></v-text-field>
    </v-flex>

    <v-flex xs1 align-self-center class="text-xs-center">
      <v-icon
        style="cursor: pointer;"
        @click="removeItem"
      >close</v-icon>
    </v-flex>
  </v-layout>
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
    lteStorage (value) {
      if ((this.product || {}).item) {
        return value <= this.currentStorage || `Máximo ${this.currentStorage}`
      }

      return true
    }
  }
}
</script>

<style>

</style>
