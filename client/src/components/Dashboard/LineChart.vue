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
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    options: {
      xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998] },
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
        curve: 'smooth',
        width: 4
      }
    },
    series: [{
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }]
  }),

  watch: {
    dark: {
      handler: 'setThemeColor',
      immediate: true
    }
  },

  computed: {
    strokeColors () {
      return this.$vuetify.theme.primary
    }
  },

  methods: {
    setThemeColor (value) {
      if (value) {
        const options = {
          chart: { foreColor: '#fff', toolbar: { show: false } },
          tooltip: { theme: 'dark' },
          stroke: {
            curve: 'smooth',
            width: 4,
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
        this.options = { ...this.options, ...options }
      } else {
        const options = {
          chart: { foreColor: '#373d3f', toolbar: { show: false } },
          tooltip: { theme: 'light' },
          stroke: {
            curve: 'smooth',
            width: 4,
            colors: this.strokeColors
          },
          markers: {
            size: 4,
            colors: this.$vuetify.theme.accent,
            strokeWidth: 0,
            fillOpacity: 1,
            hover: { sizeOffset: 3 }
          }
        }
        this.options = { ...this.options, ...options }
      }
    }
  }
}
</script>

<style>

</style>
