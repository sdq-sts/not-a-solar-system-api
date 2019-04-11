<template>
  <v-card height="100%" class="pt-2 pr-2 pl-2">
    <v-container fill-height>
      <v-layout column>
        <v-layout row>
          <v-flex xs12>
            <h2 class="text-xs-center">RESUMO DA COMPRA</h2>
          </v-flex>
        </v-layout>

        <v-layout fill-height>
          <v-flex>
            <p
              class="ml-2 mr-2"
              v-for="(item, i) in products"
              :key="`${item.product}-${i}`"
            >
              <v-layout justify-space-between>
                <v-flex xs7>
                  <p class="mb-0 text-truncate">{{i + 1}} - {{ item.name }}...</p>
                </v-flex>
                <v-flex>
                  <p class="mb-0 text-xs-right">{{ item.amount * item.salePrice | currencyBRL }}</p>
                </v-flex>
                <v-flex xs1>
                  <p class="mb-0 text-xs-right">
                    <v-icon @click="removeItem(item, i)">close</v-icon>
                  </p>
                </v-flex>
              </v-layout>
            </p>
          </v-flex>
        </v-layout>

        <v-layout justify-space-between>
          <v-flex xs3>
            <v-text-field
              class="ml-2"
              v-model.number="received"
              type="number"
              :disabled="!products.length"
              label="Valor recebido"
            ></v-text-field>
          </v-flex>
          <v-flex xs6 align-self-center>
            <p class="body-2 mb-0 mr-2 text-xs-right">TROCO: {{ change > 0 ? change : 0 | currencyBRL }}</p>
          </v-flex>
        </v-layout>

        <v-layout justify-space-between>
          <v-flex>
            <p class="mb-0 ml-2 mr-2 title">TOTAL:</p>
          </v-flex>

          <v-flex>
            <p class="mb-0 mr-2 title text-xs-right">{{ total | currencyBRL }}</p>
          </v-flex>
        </v-layout>

        <v-layout justify-space-between align-end>
          <v-flex class="mb-2">
            <v-btn
              @click="clearForm"
              flat
            >{{ text.cancel }}</v-btn>
          </v-flex>

          <v-flex class="text-xs-right mb-2">
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!products.length"
              @click="confirm"
            >{{ text.confirm }}</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    products: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    received: 0,
    text: {
      confirm: 'Confirmar venda',
      cancel: 'Cancelar'
    }
  }),

  computed: {
    total () {
      return this.products
        .reduce((x, y) => x + (y.amount * y.salePrice), 0) || 0
    },
    change () {
      return this.received - this.total
    }
  },

  methods: {
    removeItem (item, index) {
      this.$emit('remove', { item, index })
    },
    clearForm () {
      this.received = 0
      if (this.products.length) {
        this.$emit('clear')
      }
    },
    confirm () {
      if (this.products.length) {
        this.$emit('confirm', this.products)
        this.received = 0
      }
    }
  }
}
</script>

<style>

</style>
