import { apiService } from '@/services/'
import store from '@/store/'

export const verifyTokenValidity = async (jwt) => {
  apiService.setDefaultHeaders({ 'Authorization': `Bearer ${jwt || ''}` })

  try {
    const { data } = await apiService.get('/users/me')
    store.commit('set_userId', data._id)
    store.commit('set_username', data.name)
    store.commit('set_userEmail', data.email)

    return true
  } catch (error) {
    return false
  }
}
