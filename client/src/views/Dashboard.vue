<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-layout row>
          <v-flex xs4>
            <v-card color="primary" :dark="true">
              <v-card-title>
                <p class="display-1 ma-0" style="width: 100%">{{ salesTotal | currencyBRL }}</p>
              </v-card-title>
              <v-card-text>
                <p class="title">Total em vendas</p>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs2>
            <v-card color="primary" :dark="true">
              <v-card-title>
                <p class="display-1 ma-0" style="width: 100%">{{ salesCount }}</p>
              </v-card-title>
              <v-card-text>
                <p class="title">Vendas realizadas</p>
              </v-card-text>
            </v-card>
          </v-flex>

         <v-flex xs2>
            <v-card color="primary" :dark="true">
              <v-card-title>
                <p class="display-1 ma-0" style="width: 100%">{{ purchasesCount }}</p>
              </v-card-title>
              <v-card-text>
                <p class="title">Compras realizadas</p>
              </v-card-text>
            </v-card>
          </v-flex>

         <v-flex xs4>
            <v-card color="primary" :dark="true">
              <v-card-title>
                <p class="display-1 ma-0" style="width: 100%">{{ purchasesTotal | currencyBRL }}</p>
              </v-card-title>
              <v-card-text>
                <p class="title">Total em compras</p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <PurchasesChart :dark="darkMode"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import PurchasesChart from '@/components/Dashboard/PurchasesChart'

export default {
  components: {
    PurchasesChart
  },

  computed: {
    ...mapGetters([ 'darkMode' ]),
    ...mapGetters('sales', [ 'salesTotal', 'salesCount' ]),
    ...mapGetters('purchases', [ 'purchasesTotal', 'purchasesCount' ])
  },

  beforeCreate () {
    this.$store.dispatch('sales/fetchSalesMeta')
    this.$store.dispatch('purchases/fetchPurchasesMeta')
  }
}
</script>

<style>

</style>
