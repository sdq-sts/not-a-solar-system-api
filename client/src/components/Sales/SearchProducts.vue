<template>
  <v-card>
    <v-container>
      <v-layout row>
        <v-flex>
          <v-combobox
            ref="search"
            v-model="product"
            :items="items"
            :label="label"
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
      default: 'Pesquisar produto'
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
      if (v) {
        this.$emit('change', v)
        this.$refs.search.reset()
      }
    },
    watchSearch (v) {
      if (v) this.$emit('search', v)
    },
    focus () {
      this.$refs.search.focus()
    }
  },

  mounted () {
    this.$refs.search.focus()
  }
}
</script>

<style>

</style>
