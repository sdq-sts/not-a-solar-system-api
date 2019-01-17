<template>
  <v-card class="pa-3">
    <apexchart
      width="500"
      type="line"
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
      title: {
        text: 'VENDAS',
        style: {
          fontSize: '32px'
        }
      },
      tooltip: { theme: 'light' },
      chart: {
        foreColor: '#373d3f',
        toolbar: { show: false }
      },
      markers: {
        size: 4,
        strokeWidth: 0,
        fillOpacity: 1,
        hover: { sizeOffset: 3 }
      },
      stroke: {
        width: 2
      }
    },
    series: [{
      name: 'Vendas',
      data: []
    }]
  }),

  watch: {
    dark: {
      handler: 'setThemeColor',
      immediate: true
    },
    salesByMonth: {
      handler: 'setChartData',
      immediate: true
    }
  },

  computed: {
    ...mapGetters('sales', [
      'salesByMonth'
    ]),
    chartSeriesData () {
      return this.salesByMonth.reduce((x, y) => [...x, y.total], [])
    },
    chartXaxis () {
      return this.salesByMonth.reduce((x, y) => [...x, y.date], [])
    }
  },

  methods: {
    setChartData () {
      const xaxis = {
        xaxis: {
          categories: this.chartXaxis
        }
      }
      this.series = [{
        name: 'Vendas',
        data: this.chartSeriesData
      }]
      this.options = { ...this.options, ...xaxis }
    },
    darkThemeOptions () {
      return {
        chart: { foreColor: '#fff', toolbar: { show: false } },
        tooltip: { theme: 'dark' },
        stroke: {
          width: 2,
          colors: this.$vuetify.theme.primary
        },
        markers: {
          size: 4,
          colors: this.$vuetify.theme.accent,
          strokeWidth: 0,
          fillOpacity: 1,
          hover: { sizeOffset: 3 }
        }
      }
    },
    lightThemeOptions () {
      return {
        chart: { foreColor: '#373d3f', toolbar: { show: false } },
        tooltip: { theme: 'light' },
        stroke: {
          width: 2,
          colors: this.$vuetify.theme.primary
        },
        markers: {
          size: 4,
          colors: this.$vuetify.theme.accent,
          strokeWidth: 0,
          fillOpacity: 1,
          hover: { sizeOffset: 3 }
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
