<template>
  <v-card class="pa-3">
    <apexchart
      v-if="series.length"
      width="100%"
      height="300"
      type="pie"
      :options="options"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'

export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    series: [],
    options: {
      labels: [],
      legend: { show: false },
      title: { text: 'Mais vendidos', align: 'center' },
      chart: {
        foreColor: '#373d3f',
        toolbar: { show: false },
        animations: {
          enabled: true,
          speed: 900,
          animateGradually: { enabled: true, delay: 1600 },
          dynamicAnimation: { enabled: true, speed: 1500 }
        }
      }
    }
  }),

  watch: {
    dark: {
      handler: 'setThemeColor',
      immediate: true
    },
    mostSoldProducts: {
      handler: 'setChartData',
      immediate: true
    }
  },

  computed: {
    ...mapGetters('dashboard', [ 'mostSoldProducts' ])
  },

  methods: {
    async setChartData () {
      const labels = Object.values(this.mostSoldProducts).map(x => x.name ? x.name : '')
      const series = Object.values(this.mostSoldProducts).map(x => x.amount ? x.amount : 0)

      if (!isEmpty(this.mostSoldProducts) && !(isEqual(series, this.series))) {
        this.options = { ...this.options, labels }
        this.series = series
      }
    },
    darkThemeOptions () {
      const optionsChart = this.options.chart

      return {
        chart: { ...optionsChart, foreColor: '#fff', toolbar: { show: false } },
        tooltip: { theme: 'dark' },
        markers: {
          size: 3,
          strokeWidth: 0,
          fillOpacity: 1,
          hover: { sizeOffset: 2 }
        }
      }
    },
    lightThemeOptions () {
      const optionsChart = this.options.chart

      return {
        chart: { ...optionsChart, foreColor: '#373d3f', toolbar: { show: false } },
        tooltip: { theme: 'light' },
        markers: {
          size: 3,
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
  }
}
</script>

<style>

</style>
