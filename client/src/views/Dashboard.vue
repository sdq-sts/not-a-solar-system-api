<template>
  <v-container :grid-list-xl="screenSize.xlOnly" grid-list-lg class="mt-0 pt-3">
    <v-layout row wrap>
      <v-flex
        xs10 md12 lg12 xl10
        offset-xs1 offset-md0 offset-lg0 offset-xl1
      >
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

        <v-layout>
          <v-flex xs7 md8>
            <ProfitChart :dark="darkMode"/>
          </v-flex>

          <v-flex xs5 md4>
            <MostSoldChart :dark="darkMode"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import DashboardCard from '@/components/Dashboard/DashboardCard'
import PurchasesChart from '@/components/Dashboard/PurchasesChart'
import MostSoldChart from '@/components/Dashboard/MostSoldChart'
import ProfitChart from '@/components/Dashboard/ProfitChart'

export default {
  components: {
    PurchasesChart,
    MostSoldChart,
    DashboardCard,
    ProfitChart
  },

  computed: {
    ...mapGetters([ 'darkMode' ]),
    ...mapGetters('sales', [ 'salesTotal', 'salesCount' ]),
    ...mapGetters('purchases', [ 'purchasesTotalValue', 'confirmedPurchases', 'confirmedTotalValue' ]),
    screenSize () {
      return this.$vuetify.breakpoint
    }
  },

  async beforeRouteEnter (to, from, next) {
    const promises = [
      store.dispatch('sales/fetchSalesMeta'),
      store.dispatch('purchases/fetchPurchasesMeta')
    ]

    try {
      await Promise.all(promises)
    } catch (error) {
      store.dispatch('showSnackbar', { color: 'error', text: `Houve um problema ao acessar a página.` })
    }

    next()
  }
}
</script>

<style>

</style>
