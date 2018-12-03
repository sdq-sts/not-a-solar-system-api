<template>
  <v-card>
    <v-container>
      <div class="heading mb-5">{{ heading }}</div>

      <v-layout row wrap>
        <v-btn flat @click="cancel" class="ma-0">{{ cancelText }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          class="ma-0"
          :loading="loading"
          @click="confirmDeletion"
        >{{ confirmText }}</v-btn>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      default: 'Tem certeza que deseja apagar este item?'
    },
    item: {
      type: Object,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Apagar'
    },
    cancelText: {
      type: String,
      default: 'Cancelar'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    cancel () {
      this.$emit('cancelDeletion')
    },
    confirmDeletion () {
      this.$emit('confirmDeletion', this.item)
    }
  }
}
</script>

<style>

</style>
