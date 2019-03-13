<template>
  <the-wrapper>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </the-wrapper>
</template>

<script>
import TheWrapper from '@/components/Shared/TheWrapper'

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
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */
</style>
