import store from '@/store'
import { apiService } from '@/services/'

export const resetAuthCredentials = () => {
  store.commit('RESET_STORE')
  localStorage.removeItem('jwt')
  localStorage.removeItem('user')
  apiService.setDefaultHeaders({ 'Authorization': `Bearer` })
}
