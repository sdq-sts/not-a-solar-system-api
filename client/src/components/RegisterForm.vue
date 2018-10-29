<template>
  <v-card>
    <v-form
      ref="form"
      v-model="validForm"
      @submit.prevent="submit(name, email, password)">
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs12>
            <h3 class="headline mb-0 text-xs-center">Criar conta</h3>
          </v-flex>
        </v-layout>
      </v-card-title>

      <v-card-text >
        <v-layout row wrap>
           <v-flex xs12>
            <v-text-field xs12
              v-model="name"
              :rules="nameRules"
              tabindex="1"
              placeholder="Nome"
              single-line
              autofocus
              box
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field xs12
              v-model="email"
              :rules="emailRules"
              required
              placeholder="Email"
              single-line
              box
              tabindex="2"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 >
            <v-text-field xs12
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
              tabindex="3"
              v-model="password"
              placeholder="Senha"
              single-line
              box
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions class="pl-3 pr-3 pb-3">
        <v-btn
          large
          tabindex="-1"
          @click="clearForm"
        >Limpar</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          :disabled="!validForm"
          tabindex="4"
          large
          type="submit"
          @submit.prevent="submit(name, email, password)"
        >Criar Conta</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: '',
    email: '',
    password: '',
    showPassword: false,
    validForm: false,
    nameRules: [
      v => !!v || 'Campo obrigatório',
      v => v ? v.length >= 3 : 'Nome deve ter pelo menos 3 caracteres'
    ],
    emailRules: [
      v => !!v || 'Campo obrigatório',
      v => /.+@.+/.test(v) || 'Email deve ser válido'
    ],
    passwordRules: [
      v => !!v || 'Campo obrigatório',
      v => v ? v.length >= 3 : 'Senha deve ter pelo menos 3 caracteres'
    ]
  }),

  methods: {
    clearForm () {
      this.$refs.form.reset()
      this.$emit('clearFormAlerts', true)
    },
    submit (name, email, password) {
      this.$emit('submitRegisterForm', { name, email, password })
    }
  }
}
</script>

<style>

</style>
