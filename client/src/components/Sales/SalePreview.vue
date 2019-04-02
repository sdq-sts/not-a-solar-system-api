<template>
  <v-card height="100%">
    <v-container fill-height>
      <v-layout column>
        <v-layout row>
          <v-flex xs12>
            <span>SALE PREVIEW</span>
          </v-flex>
        </v-layout>

        <v-layout>
          <pre>
            {{ products }}
          </pre>
        </v-layout>

        <v-layout justify-space-between align-end>
          <v-flex class="mb-2">
            <v-btn
              @click="clearForm"
              flat
            >Cancelar</v-btn>
          </v-flex>

          <v-flex class="text-xs-right mb-2">
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!products.length"
              @click="confirm"
            >Confirmar Venda</v-btn>
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

  methods: {
    clearForm () {
      if (this.products.length) {
        this.$emit('clear')
      }
    },
    confirm () {
      if (this.products.length) {
        this.$emit('confirm', this.products)
      }
    }
  }
}
</script>

<style>

</style>
