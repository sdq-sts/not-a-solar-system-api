<template>
<v-container grid-list-xl>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2>
      <v-layout>
        <v-flex xs3>
          <ProfilePicture
            v-model="file"
            :img="userAvatar"
            :default="defaultAvatar"
          />
        </v-flex>

        <v-flex xs9>
          <ProfileForm
            :user="user"
            :loading="loading"
            @submitForm="submitForm"
          />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProfilePicture from '@/components/Settings/ProfilePicture'
import ProfileForm from '@/components/Settings/ProfileForm'

export default {
  components: {
    ProfilePicture,
    ProfileForm
  },

  data: () => ({
    loading: false,
    file: '',
    text: {
      successUpdate: 'Perfil atualizado com sucesso',
      errorUploadImg: 'Erro ao fazer upload de imagem',
      errorOldPass: 'A senha antiga não é válida',
      errorUpdate: 'Erro ao atualizar perfil'
    }
  }),

  computed: {
    ...mapGetters([
      'user',
      'getImage',
      'userAvatar',
      'defaultAvatar'
    ])
  },

  methods: {
    ...mapActions([
      'editUser',
      'uploadFile',
      'showSnackbar',
      'validatePassword',
      'fetchCurrentUser',
      'requestFileUploadUrl'
    ]),
    async submitForm (data) {
      const { oldPassword, password, ...update } = data

      if (this.file) {
        this.loading = true
        const { type: fileType } = this.file
        try {
          const { data: res } = await this.requestFileUploadUrl({ fileType, folder: 'avatars' })
          await this.uploadFile({ url: res.url, file: this.file })

          update.avatar = res.key
        } catch (error) {
          this.showSnackbar({ color: 'error', text: this.text.errorUploadImg })
          this.loading = false
        }
      }

      if (oldPassword && password) {
        const passUpdate = { ...update, password }
        const payload = { email: data.email, password: oldPassword }
        const res = await this.validatePassword(payload)

        if (res.status === 200) {
          this.sendForm(passUpdate)
          this.fetchCurrentUser()
        } else {
          this.showSnackbar({ color: 'error', text: this.text.errorOldPass })
        }
      } else {
        const { password, ...updateWithoutPass } = update
        this.sendForm(updateWithoutPass)
        this.fetchCurrentUser()
      }
    },
    async sendForm (update) {
      this.loading = true

      try {
        await this.editUser(update)
        this.showSnackbar({ color: 'success', text: this.text.successUpdate })
        this.loading = false
      } catch (error) {
        this.showSnackbar({ color: 'error', text: this.text.errorUpdate })
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
