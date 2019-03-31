<template>
  <v-card :class="{ 'pa-3': screenSize.xlOnly, 'pa-1': screenSize.lgAndDown }">
    <apexchart
      width="100%"
      :height="screenSize.lgAndDown ? 250 : 290"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyBRL from '@/filters/currencyBRL'
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
    totalProfit: 0,
    series: [{ name: 'Lucro', data: [] }],
    options: {
      labels: [],
      dataLabels: { enabled: false },
      yaxis: {
        labels: { formatter: (value) => currencyBRL(value) }
      },
      title: { text: `Lucro no período`, align: 'center' },
      chart: {
        foreColor: '#373d3f',
        toolbar: { show: false },
        animations: {
          enabled: true,
          speed: 900,
          animateGradually: {
            enabled: true,
            delay: 300
          },
          dynamicAnimation: {
            enabled: true,
            speed: 1500
          }
        }
      }
    }
  }),

  watch: {
    dark: {
      handler: 'setThemeColor',
      immediate: true
    },
    profitInPeriod: {
      handler: 'setChartData',
      immediate: true
    }
  },

  computed: {
    ...mapGetters('dashboard', [ 'period' ]),
    ...mapGetters('dashboard', [ 'profitInPeriod' ]),
    screenSize () {
      return this.$vuetify.breakpoint
    }
  },

  methods: {
    async setChartData () {
      const labels = this.period
      const series = [{ name: 'Lucro', data: this.profitInPeriod }]

      if (!isEmpty(this.profitInPeriod) && !(isEqual(series[0].data, this.series[0].data))) {
        this.options = { ...this.options, labels }
        this.series = series
      }
    },
    darkThemeOptions () {
      const optionsChart = this.options.chart

      return {
        chart: { ...optionsChart, foreColor: '#fff', toolbar: { show: false } },
        stroke: { width: 2, curve: 'smooth' },
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
        stroke: { width: 2, curve: 'smooth' },
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
