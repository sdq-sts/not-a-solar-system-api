<template>
  <v-card class="rounded-card pt-2 pb-2 pl-3 pr-3">
    <v-card-title class="pa-0 mt-3">
      <p
        :class="{ 'headline': screenSize.xlOnly, 'title': screenSize.lgAndDown, 'ma-0': true }"
      >{{ info }}</p>
    </v-card-title>

    <v-card-text :class="{ 'pl-0 pr-0': true, 'pb-0': screenSize.lgAndDown }">
      <p :class="{ 'body-2': screenSize.xlOnly, 'body-1': screenSize.lgAndDown, 'mb-0': true }">{{ title }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    info: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    screenSize () {
      return this.$vuetify.breakpoint
    }
  }
}
</script>

<style>
.rounded-card {
  border-radius: 6px;
}
</style>
