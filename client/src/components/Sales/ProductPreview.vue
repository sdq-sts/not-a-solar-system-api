<template>
  <v-card>
    <v-container>
      <v-layout row>
        <v-flex>
          <h2>{{ product ? product.name : '' }}</h2>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs6>
          <p class="body">{{ product ? product.description : '' }}</p>
        </v-flex>

        <v-flex xs6>
          <img style="max-width: 100%; display: block" :src="`${(product || {}).image ? product.image : defaultImage}`" alt="">
        </v-flex>
      </v-layout>

      <v-form ref="productForm">
        <v-layout row justify-space-between align-center>
          <v-flex xs2>
            <v-text-field
              v-model="amount"
              label="Quantidade"
              :rules="[ minAmount, maxAmount ]"
              type="number"
            ></v-text-field>
          </v-flex>

          <v-btn
            color="primary"
            :disabled="!product"
            @click="addProduct"
          >Adicionar produto</v-btn>
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
    amount: 1
  }),

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
        const amount = Number(this.amount)
        const { _id: product, salePrice, name } = this.product
        this.$emit('addProduct', { product, salePrice, name, amount })
      }
    }
  }
}
</script>

<style>

</style>
