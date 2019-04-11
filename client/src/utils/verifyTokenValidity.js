import { apiService } from '@/services/'
import store from '@/store/'

export const verifyTokenValidity = async (jwt) => {
  apiService.setDefaultHeaders({ 'Authorization': `Bearer ${jwt || ''}` })

  try {
    await store.dispatch('fetchCurrentUser')
    return true
  } catch (error) {
    return false
  }
}
