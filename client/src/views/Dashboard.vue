<template>
  <div>
    <h1>DASHBOARD INDEX PAGE</h1>
    <LineChart :dark="darkMode"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/components/Dashboard/SalesChart'

export default {
  components: {
    LineChart
  },
  computed: {
    ...mapGetters([
      'darkMode'
    ])
  }
}
</script>

<style>

</style>
