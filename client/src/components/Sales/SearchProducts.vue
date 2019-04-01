<template>
  <v-card>
    <v-container>
      <v-layout>
        <v-flex>
          <v-combobox
            v-model="product"
            :items="items"
            :search-input.sync="search"
            :loading="loading"
            @change="emitChange"
            clearable
          ></v-combobox>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Buscar'
    },
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    product: '',
    search: ''
  }),

  watch: {
    search: {
      handler: 'watchSearch'
    }
  },

  methods: {
    emitChange (v) {
      if (v) this.$emit('change', v)
    },
    watchSearch (v) {
      if (v) this.$emit('search', v)
    }
  }
}
</script>

<style>

</style>
