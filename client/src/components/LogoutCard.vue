<template>
  <v-card>
    <v-layout row>
      <v-flex xs7>
        <v-card-title primary-title>
          <div class="headline">{{ username }}</div>
        </v-card-title>
      </v-flex>

      <v-flex xs5 justify-center align-center>
        <div class="pr-3">
          <v-img :src="userPictureUrl" height="125px" contain></v-img>
        </div>
      </v-flex>
    </v-layout>

    <v-divider light></v-divider>

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
  }
}
</script>

<style>

</style>
