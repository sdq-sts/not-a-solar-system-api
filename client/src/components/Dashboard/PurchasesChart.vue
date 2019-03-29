<template>
  <v-card class="pa-3">
    <apexchart
      width="100%"
      height="298"
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyBRL from '@/filters/currencyBRL'
import isEqual from 'lodash/isEqual'

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
      yaxis: {
        labels: {
          formatter: (value) => currencyBRL(value)
        }
      },
      tooltip: { theme: 'light' },
      chart: {
        foreColor: '#373d3f',
        toolbar: { show: false },
        animations: {
          enabled: true,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 600
          }
        }
      },
      stroke: { width: 2, curve: 'smooth' },
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
    mainChartData: {
      handler: 'setChartData',
      immediate: true
    }
  },

  computed: {
    ...mapGetters('dashboard', [ 'mainChartData' ]),
    ...mapGetters('dashboard', [ 'period' ])
  },

  methods: {
    async setChartData () {
      const xaxis = { xaxis: { categories: this.period } }

      if (this.mainChartData && !(isEqual(this.mainChartData, this.series))) {
        this.options = { ...this.options, ...xaxis }
        this.series = this.mainChartData
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
