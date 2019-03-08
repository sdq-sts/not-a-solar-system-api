<template>
  <v-layout row wrap>
    <v-flex xs5>
      <v-combobox
        v-model="product"
        :items="items"
        :label="labels.item"
        :search-input.sync="search"
        @change="update"
        hide-selected
        clearable
        dense
      ></v-combobox>
    </v-flex>

    <v-flex xs2>
      <v-text-field
        v-model="amount"
        :label="labels.amount"
        type="number"
        @input="update"
      ></v-text-field>
    </v-flex>

    <v-flex xs2>
      <v-text-field
        v-model="cost"
        :label="labels.cost"
        type="number"
        @input="update"
      ></v-text-field>
    </v-flex>

    <v-flex xs2>
      <v-text-field
        :label="labels.total"
        :value="total | currencyBRL"
        tabindex="-1"
        disabled
        readonly
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
    isEditing: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object
    },
    label: {
      type: String,
      default: 'Item'
    }
  },

  data: () => ({
    item: null,
    search: '',
    product: '',
    amount: 1,
    cost: 0,
    items: [],
    labels: {
      item: 'Produto',
      amount: 'Quantidade',
      cost: 'Custo unitário',
      total: 'Custo total'
    },
    // rules: {
    //   search: [
    //     (v) => !!(v && v.text) || 'Campo inválido'
    //   ]
    // }
  }),

  watch: {
    isEditing: {
      handler: 'watchIsEditing',
      immediate: true
    },
    search: {
      handler: 'watchSearch'
    }
  },

  computed: {
    total () {
      return this.cost * this.amount
    }
  },

  methods: {
    ...mapActions('products', [ 'fetchProducts' ]),
    async watchSearch (search) {
      if (search) {
        const products = await this.fetchProducts({ search })
        this.items = products.map((product) => ({ text: product.name, item: product }))
      } else {
        this.items = []
      }
    },
    watchIsEditing (isEditing) {
      const productName = (((this.value || {}).product || {}).name || '')
      const amount = (this.value || {}).amount || 0
      const cost = (this.value || {}).cost || 0

      if (isEditing) {
        this.product = productName
        this.amount = amount
        this.cost = cost
      }
    },
    update () {
      const { product, amount, cost } = this
      const productId = ((product || {}).item || {})._id
      const productAmount = parseFloat(amount) || 0
      const productCost = parseFloat(cost) || 0

      this.$emit('input', {
        product: productId,
        amount: productAmount,
        cost: productCost
      })
    },
    removeItem (e) {
      this.$emit('removeItem', e)
    }
  }
}
</script>

<style>

</style>
