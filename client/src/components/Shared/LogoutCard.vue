<template>
  <v-card>
    <v-card-title>
      <v-layout row>
        <v-flex>
          <v-card-title primary-title>
            <div class="headline">{{ username }}</div>
          </v-card-title>
        </v-flex>

        <v-flex xs5 class="text-xs-center">
          <v-avatar size="120px">
            <v-img :src="userPictureUrl"></v-img>
          </v-avatar>
        </v-flex>
      </v-layout>
    </v-card-title>

    <v-divider light></v-divider>

    <v-card-text class="mb-0">
      <v-layout row wrap align-center>
        <v-flex align-self-center>
          <v-layout row wrap align-center>
            <v-icon>{{ darkTheme ? 'brightness_2': 'wb_sunny' }}</v-icon>
            <span class="ml-3 body-2">{{ text.darkMode }}</span>
          </v-layout>
        </v-flex>

        <v-flex xs3>
          <v-layout row justify-content-end>
            <v-switch
              v-model="darkTheme"
              color="primary"
            ></v-switch>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions class="pa-3">
      <v-layout row wrap>
        <v-flex xs12>
          <v-btn class="mt-3" :color="color" large block @click="logoutAction()">{{ logoutBtnText }}</v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      required: true
    },
    userPictureUrl: {
      type: String,
      required: true
    },
    logoutAction: {
      type: Function,
      required: true
    },
    profilePathName: {
      type: String,
      require: true
    },
    profileBtnText: {
      type: String,
      default: 'Perfil'
    },
    logoutBtnText: {
      type: String,
      default: 'Sair'
    },
    color: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    darkTheme: false,
    text: {
      darkMode: 'MODO ESCURO'
    }
  }),

  watch: {
    darkTheme: {
      handler: 'watchDarkProp',
      immediate: false
    }
  },

  methods: {
    watchDarkProp (value) {
      this.$emit('setDarkTheme', value)
    }
  },

  mounted () {
    this.darkTheme = this.dark
  }
}
</script>

<style>

</style>
