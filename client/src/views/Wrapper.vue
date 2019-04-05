<template>
  <the-wrapper>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path"/>
    </transition>
  </the-wrapper>
</template>

<script>
import TheWrapper from '@/components/Shared/TheWrapper'

export default {
  components: { TheWrapper }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
