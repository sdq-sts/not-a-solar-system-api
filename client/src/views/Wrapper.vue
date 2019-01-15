<template>
  <the-wrapper>
    <router-view/>
  </the-wrapper>
</template>

<script>
import TheWrapper from '@/components/TheWrapper'

export default {
  components: { TheWrapper },

  data: () => ({}),

  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>

</style>
