<template>
  <v-card color="rounded-card secondary pt-3 pb-3 pl-4 pr-4">
    <v-card-title>
      <p class="display-1 ma-0" style="width: 100%">{{ info }}</p>
    </v-card-title>

    <v-card-text>
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
