<template>
  <v-card color="rounded-card pt-2 pb-2 pl-3 pr-3">
    <v-card-title class="pa-1">
      <p class="headline ma-0" style="width: 100%">{{ info }}</p>
    </v-card-title>

    <v-card-text class="pl-0 pr-0">
      <p class="body-2 mb-0">{{ title }}</p>
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
  }
}
</script>

<style>
.rounded-card {
  border-radius: 6px;
}
</style>
