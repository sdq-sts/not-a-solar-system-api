<template>
  <v-card ripple style="position: fixed" width="30%">
    <v-container>
      <v-layout row wrap align-content-center justify-space-between>
        <v-flex xs4>
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

        <v-flex>
          <p class="heading display-2 text-xs-right">{{ total | currencyBRL }}</p>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-space-between>
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
      return this.received - this.total
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
