<template>
  <v-card class="pa-4">
    <v-container>
      <v-form ref="form">
        <v-layout>
          <v-flex>
            <h3 class="ma-0 text-xs-center">{{ text.personalInfo }}</h3>
          </v-flex>
        </v-layout>

        <v-layout justify-space-between>
          <v-flex xs7>
            <v-text-field
              v-model="name"
              :label="labels.name"
            ></v-text-field>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              v-model="birthday"
              :label="labels.birthday"
              :rules="[ validateDate ]"
              validate-on-blur
              mask="##/##/####"
              return-masked-value
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <h3 class="ma-0 text-xs-center">{{ text.contactInfo }}</h3>
          </v-flex>
        </v-layout>

        <v-layout justify-space-between>
          <v-flex xs7>
            <v-text-field
              v-model="email"
              :label="labels.email"
            ></v-text-field>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              v-model="phone"
              mask="(##) ####-#####"
              :label="labels.phone"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <h3 class="ma-0 text-xs-center">{{ text.changePassword }}</h3>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <v-text-field
              v-model="oldPassword"
              :label="labels.oldPassword"
              type="password"
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              v-model="password"
              :label="labels.password"
              type="password"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex class="text-xs-right">
            <v-btn
              color="primary"
              class="mr-0"
              :loading="loading"
              @click="submitForm"
            >{{ text.updateProfile }}</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import isEmpty from 'lodash/isEmpty'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    name: '',
    email: '',
    oldPassword: '',
    password: '',
    birthday: '',
    phone: '',
    labels: {
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone',
      oldPassword: 'Senha antiga',
      password: 'Nova  senha',
      birthday: 'Data de nascimento'
    },
    text: {
      changePassword: 'TROCAR SENHA',
      updateProfile: 'ATUALIZAR PERFIL',
      personalInfo: 'INFORMAÇÃO PESSOAL',
      contactInfo: 'INFORMAÇÃO DE CONTATO'
    }
  }),

  watch: {
    user: {
      handler: 'watchUser',
      immediate: true
    }
  },

  methods: {
    watchUser (user) {
      if (!isEmpty(user)) {
        this.name = user.name
        this.email = user.email
        this.phone = user.phone
        this.birthday = this.$options.filters.formatedDate(user.birthday)
      }
    },
    validateDate (d) {
      if (d) {
        const validation = d.match(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/)
        return !!validation || 'Data inválida'
      }

      return true
    },
    submitForm () {
      const { name, email, birthday: bday, phone, oldPassword, password } = this

      if (this.$refs.form.validate()) {
        const birthday = bday
          ? new Date(bday.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')).toISOString()
          : ''
        this.$emit('submitForm', { name, email, birthday, phone, oldPassword, password })
        this.oldPassword = ''
        this.password = ''
      }
    }
  }
}
</script>

<style>

</style>
