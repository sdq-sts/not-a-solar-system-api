import { apiService } from '@/services/'
import { setAuthCredentials } from '@/utils/setAuthCredentials'
import { resetAuthCredentials } from '@/utils/resetAuthCredentials'
import { handleAjaxErrors } from '@/utils/handleAjaxErrors'

export const actions = {
  async submitLoginForm (ctx, payload) {
    const { commit } = ctx
    try {
      const { nextUrl, ...userData } = payload
      const { data } = await apiService.post('/auth', userData)

      setAuthCredentials(data)
      commit('set_isLoggedIn', true)

      return true
    } catch (error) {
      handleAjaxErrors(error.response)
      return false
    }
  },

  logout (ctx) {
    resetAuthCredentials()
    return Promise.resolve(true)
  }
}
