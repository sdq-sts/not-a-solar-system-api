<template>
  <v-card class="pa-3">
    <apexchart
      width="100%"
      height="290"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    series: [{
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
    options: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      dataLabels: { enabled: false },
      chart: {
        foreColor: '#373d3f',
        toolbar: { show: false },
        animations: {
          enabled: true,
          speed: 900,
          animateGradually: {
            enabled: false,
            delay: 1600
          },
          dynamicAnimation: {
            enabled: false,
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
    }
    // mainChartData: {
    //   handler: 'setChartData',
    //   immediate: true
    // }
  },

  methods: {
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
