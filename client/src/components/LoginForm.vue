<template>
  <v-card>
    <v-form ref="form" @submit.prevent="submit(email, password)">
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs12>
            <h3 class="headline mb-0 text-xs-center">Login</h3>
          </v-flex>
        </v-layout>
      </v-card-title>

      <v-card-text >
        <v-layout row wrap>
           <v-flex xs12>
            <v-text-field xs12
              v-model="email"
              placeholder="Email"
              single-line
              autofocus
              box
            ></v-text-field>
          </v-flex>

          <v-flex xs12 >
            <v-text-field xs12
              v-model="password"
              type="password"
              placeholder="Senha"
              single-line
              box
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions class="pl-3 pr-3 pb-3">
        <v-btn
          large
          @click="clearForm"
        >Limpar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info"
          large
          type="submit"
          @submit.prevent="submit(email, password)"
        >Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    clearForm () {
      this.$refs.form.reset()
    },
    submit (email, password) {
      this.$emit('submitLoginForm', { email, password })
    }
  }
}
</script>

<style>

</style>
