import { apiService } from '@/services/'
import store from '@/store/'

export const verifyTokenValidity = async (jwt) => {
  apiService.setDefaultHeaders({ 'Authorization': `Bearer ${jwt || ''}` })

  try {
    const { data } = await apiService.get('/users/me')
    store.commit('SET_USER_ID', data._id)
    store.commit('SET_USER_NAME', data.name)
    store.commit('SET_USER_EMAIL', data.email)
    store.commit('SET_DARK_MODE', data.darkMode)

    return true
  } catch (error) {
    return false
  }
}
