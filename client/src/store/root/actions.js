import axios from 'axios'
import { apiService } from '@/services/'
import { setAuthCredentials } from '@/utils/setAuthCredentials'
import { resetAuthCredentials } from '@/utils/resetAuthCredentials'
import { handleAjaxErrors } from '@/utils/handleAjaxErrors'

export const actions = {
  async submitLoginForm (ctx, payload) {
    const { commit } = ctx

    try {
      const { data } = await apiService.post('/auth', payload)

      setAuthCredentials(data)
      commit('set_isLoggedIn', true)

      return true
    } catch (error) {
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

  async submitRegisterProductForm (ctx, payload) {
    try {
      const result = await apiService.post('/products', payload)

      return result
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

    commit('set_snackbarText', text)
    commit('set_snackbarColor', color)
    commit('set_snackbar', true)
  },

  logout (ctx) {
    resetAuthCredentials()
  }
}
