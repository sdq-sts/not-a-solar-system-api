<template>
  <v-card>
    <v-container>
      <div class="heading">Tem certeza que deseja apagar o produto:</div>
      <p>{{ product.name }}</p>
      <v-layout row>
        <v-btn flat @click="cancel">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="confirmDeletion">Apagar</v-btn>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirmDeletion () {
      this.$emit('confirm', this.product)
    }
  }
}
</script>

<style>

</style>
