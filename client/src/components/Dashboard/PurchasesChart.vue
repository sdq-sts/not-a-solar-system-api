<template>
  <v-card class="pa-3">
    <apexchart
      width="500"
      type="area"
      :options="options"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    options: {
      xaxis: { categories: [] },
      tooltip: { theme: 'light' },
      chart: { foreColor: '#373d3f', toolbar: { show: false } },
      stroke: { width: 2 },
      markers: {
        size: 0,
        strokeWidth: 0,
        fillOpacity: 1,
        hover: { sizeOffset: 3 }
      }
    },
    series: [
      { name: 'Compras', data: [] },
      { name: 'Vendas', data: [] }
    ]
  }),

  watch: {
    dark: {
      handler: 'setThemeColor',
      immediate: true
    },
    salesByMonth: {
      handler: 'setChartData',
      immediate: true
    },
    purchasesByMonth: {
      handler: 'setChartData',
      immediate: true
    }
  },

  computed: {
    ...mapGetters('sales', [ 'salesByMonth' ]),
    ...mapGetters('purchases', [ 'purchasesByMonth' ]),
    chartSeriesSalesData () {
      return this.salesByMonth.reduce((x, y) => [...x, y.total], []) || []
    },
    chartSeriesPurchasesData () {
      return this.purchasesByMonth.reduce((x, y) => [...x, y.total], []) || []
    },
    chartXaxis () {
      return this.purchasesByMonth.reduce((x, y) => [...x, y.date], [])
    }
  },

  methods: {
    setChartData () {
      const xaxis = { xaxis: { categories: this.chartXaxis } }
      this.options = { ...this.options, ...xaxis }
      this.series = [
        { name: 'Compras', data: [...this.chartSeriesPurchasesData] },
        { name: 'Vendas', data: [...this.chartSeriesSalesData] }
      ]
    },
    darkThemeOptions () {
      return {
        chart: { foreColor: '#fff', toolbar: { show: false } },
        stroke: { width: 2 },
        tooltip: { theme: 'dark' },
        markers: {
          size: 0,
          colors: this.$vuetify.theme.accent,
          strokeWidth: 0,
          fillOpacity: 1,
          hover: { sizeOffset: 2 }
        }
      }
    },
    lightThemeOptions () {
      return {
        chart: { foreColor: '#373d3f', toolbar: { show: false } },
        stroke: { width: 2 },
        tooltip: { theme: 'light' },
        markers: {
          size: 0,
          colors: this.$vuetify.theme.accent,
          strokeWidth: 0,
          fillOpacity: 1,
          hover: { sizeOffset: 2 }
        }
      }
    },
    setThemeColor (value) {
      if (value) {
        this.options = { ...this.options, ...this.darkThemeOptions() }
      } else {
        this.options = { ...this.options, ...this.lightThemeOptions() }
      }
    }
  },

  mounted () {
    this.setChartData()
  }
}
</script>

<style>

</style>
