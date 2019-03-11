<template>
  <v-card ripple style="position: fixed" width="30%">
    <v-container>
      <h2 class="heading display-1 text-xs-center mb-5">RESUMO DA COMPRA</h2>

      <v-layout row wrap justify-space-between>
        <v-flex align-self-center>
          <p class="headline text-xs-left ma-0">VALOR RECEBIDO</p>
        </v-flex>

        <v-flex xs4>
          <v-text-field
            v-model="received"
            :rules="[ gteProductsTotal ]"
            type="number"
            min="0"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row class="mb-3">
        <v-flex>
          <p class="headline text-xs-left ma-0">TROCO</p>
        </v-flex>

        <v-flex>
          <p class="headline text-xs-right ma-0">{{ change | currencyBRL }}</p>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-between>
        <v-flex>
          <p class="headline text-xs-left">TOTAL</p>
        </v-flex>

        <v-flex>
          <p class="headline text-xs-right">{{ total | currencyBRL }}</p>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-between class="mt-5">
        <v-btn
          class="ma-0"
          @click="$emit('clear')"
          large
          flat
        >{{ text.clear }}</v-btn>

        <v-btn
          color="primary"
          class="ma-0"
          :loading="loading"
          @click="$emit('submit')"
          large
        >{{ text.confirm }}</v-btn>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    received: 0,
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
    change () {
      return (this.received - this.total) > 0 ? this.received - this.total : 0
    }
  },

  methods: {
    gteProductsTotal (value) {
      return value >= this.total || 'Valor muito baixo'
    }
  }
}
</script>

<style>

</style>
