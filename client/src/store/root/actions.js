import axios from 'axios'
import { apiService } from '@/services/'
import { setAuthCredentials } from '@/utils/setAuthCredentials'
import { resetAuthCredentials } from '@/utils/resetAuthCredentials'
import { handleAjaxErrors } from '@/utils/handleAjaxErrors'

export const actions = {
  async submitLoginForm (ctx, payload) {
    const { commit, dispatch } = ctx

    try {
      const { data } = await apiService.post('/auth', payload)

      setAuthCredentials(data)
      commit('SET_LOGGEDIN', true)

      return true
    } catch (error) {
      dispatch('showSnackbar', { color: 'error', text: 'Email ou senha inválidos.' })
      handleAjaxErrors(error.response)
      return false
    }
  },

  async submitRegisterForm (ctx, payload) {
    try {
      const result = await apiService.post('/users', payload)

      return result
    } catch (error) {
      handleAjaxErrors(error)

      return error
    }
  },

  async validatePassword (ctx, payload) {
    try {
      const result = await apiService.post('/auth/validate', payload)
      return result
    } catch (error) {
      handleAjaxErrors(error)
      return false
    }
  },

  async fetchCurrentUser (ctx) {
    const { commit } = ctx
    const { data } = await apiService.get('/users/me')
    commit('SET_USER', data)
    commit('SET_USER_ID', data._id)
    commit('SET_USER_NAME', data.name)
    commit('SET_USER_EMAIL', data.email)
    commit('SET_USER_AVATAR', data.avatar)
    commit('SET_DARK_MODE', data.darkMode)
  },

  async editUser (ctx, payload) {
    const id = ctx.getters.userId

    try {
      const res = await apiService.put(`/users/${id}`, payload)
      return res
    } catch (error) {
      handleAjaxErrors(error)
      return error
    }
  },

  async requestFileUploadUrl (ctx, payload) {
    const { fileType, folder } = payload
    const res = await apiService.get('services/upload', { params: { fileType, folder } })
    return res
  },

  uploadFile (ctx, payload) {
    const { url, file } = payload
    return axios.put(url, file, { headers: { 'Content-Type': file.type } })
  },

  showSnackbar (ctx, payload) {
    const { commit } = ctx
    const { text, color } = payload

    commit('SET_SNACKBAR_TEXT', text)
    commit('SET_SNACKBAR_COLOR', color)
    commit('SET_SNACKBAR', true)
  },

  logout (ctx) {
    resetAuthCredentials()
  }
}
