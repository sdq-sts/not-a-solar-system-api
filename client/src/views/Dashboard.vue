<template>
  <v-container grid-list-xl class="mt-0">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-layout row>
          <v-flex xs4>
            <DashboardCard
              :info="salesTotal | currencyBRL"
              title="Total em vendas"
            />
          </v-flex>

          <v-flex xs2>
            <DashboardCard
              :info="salesCount"
              title="Vendas realizadas"
            />
          </v-flex>

         <v-flex xs2>
            <DashboardCard
              :info="confirmedPurchases"
              title="Compras realizadas"
            />
          </v-flex>

         <v-flex xs4>
            <DashboardCard
              :info="confirmedTotalValue | currencyBRL"
              title="Total em compras"
            />
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
import DashboardCard from '@/components/Dashboard/DashboardCard'

export default {
  components: {
    PurchasesChart,
    DashboardCard
  },

  computed: {
    ...mapGetters([ 'darkMode' ]),
    ...mapGetters('sales', [ 'salesTotal', 'salesCount' ]),
    ...mapGetters('purchases', [ 'purchasesTotalValue', 'confirmedPurchases', 'confirmedTotalValue' ])
  },

  beforeCreate () {
    this.$store.dispatch('sales/fetchSalesMeta')
    this.$store.dispatch('purchases/fetchPurchasesMeta')
  }
}
</script>

<style>

</style>
