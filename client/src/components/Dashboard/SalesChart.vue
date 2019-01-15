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
        width: 2
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
