<template>
  <v-card>
    <v-container>
      <v-layout row>
        <v-flex>
          <h2>{{ product ? product.name : 'Produto' }}</h2>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs6>
          <div v-if="product">
            <div>
              <p class="body-2">VALOR UNITÁRIO: {{ price | currencyBRL }}</p>
            </div>

            <div>
              <p class="body-2">EM ESTOQUE: {{ currentStorage }}</p>
            </div>

            <div>
              <p class="body-2">DESCRIÇÃO:</p>
              <p>{{ description }}</p>
            </div>
          </div>
        </v-flex>

        <v-flex xs6>
          <img style="max-width: 100%; display: block" :src="`${(product || {}).image ? product.image : defaultImage}`" alt="">
        </v-flex>
      </v-layout>

      <v-form ref="productForm">
        <v-layout row justify-space-between>
          <v-flex xs2 shrink>
            <v-text-field
              v-model.number="amount"
              label="Quantidade"
              :rules="[ minAmount, maxAmount ]"
              type="number"
            ></v-text-field>
          </v-flex>

          <v-flex align-self-center grow>
            <p class="body-2 ma-0 text-xs-center">{{ productTotal | currencyBRL }}</p>
          </v-flex>

          <v-flex
            class="text-xs-right"
            align-self-center
            shrink
          >
            <v-btn
              color="primary"
              class="mr-0"
              :disabled="!product"
              @click="addProduct"
            >{{ text.addProduct }}</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    defaultImage: {
      type: String,
      required: true
    },
    product: {
      type: Object,
      default: null
    }
  },

  data: () => ({
    amount: 1,
    text: {
      addProduct: 'Adicionar Produto'
    }
  }),

  computed: {
    description () {
      return this.product ? this.product.description : ''
    },
    price () {
      return this.product ? this.product.salePrice : 0
    },
    currentStorage () {
      return this.product ? this.product.currentStorage : 0
    },
    productTotal () {
      return (this.product || {}).salePrice * this.amount || 0
    }
  },

  methods: {
    maxAmount (v) {
      if (this.product && v) {
        return v <= this.product.currentStorage || `Máximo ${this.product.currentStorage}`
      }

      return true
    },
    minAmount (v) {
      if (this.product) {
        return v >= 1 || `Mínimo 1`
      }

      return true
    },
    addProduct () {
      if (this.product && this.$refs.productForm.validate()) {
        const amount = this.amount
        const { _id: product, salePrice, name } = this.product

        this.$emit('addProduct', { product, salePrice, name, amount })
        this.amount = 1
      }
    }
  }
}
</script>

<style>

</style>
