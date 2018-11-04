<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <RegisterProductForm
          @registerProduct="sendForm"
          :color="appMainColor"
          :isDarkColor="isDarkTheme"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import RegisterProductForm from '@/components/RegisterProductForm'

export default {
  components: { RegisterProductForm },
  data: () => ({}),

  computed: {
    ...mapGetters(['appMainColor', 'isDarkTheme'])
  },

  methods: {
    sendForm (payload) {
      console.log(payload)
    }
  }
}
</script>

<style>

</style>
