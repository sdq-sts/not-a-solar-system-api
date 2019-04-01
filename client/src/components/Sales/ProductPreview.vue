<template>
  <v-card>
    <v-container>
      <v-layout>
        <v-flex>
          <h1>PRODUCT PREVIEW</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>

</style>
