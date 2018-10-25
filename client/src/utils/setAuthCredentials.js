import { apiService } from '@/services/'
import store from '@/store/'

export const setAuthCredentials = (data) => {
  const jwt = localStorage.getItem('jwt')

  if (data) {
    apiService.setDefaultHeaders({ 'Authorization': `Bearer ${jwt}` })
    localStorage.setItem('user', JSON.stringify({ email: data.email, id: data.id }))
    localStorage.setItem('jwt', data.token)
    store.commit('set_jwt', data.token)
  } else if (!data && jwt) {
    apiService.setDefaultHeaders({ 'Authorization': `Bearer ${jwt}` })
    store.commit('set_jwt', jwt)
  } else {
    apiService.setDefaultHeaders({ 'Authorization': `Bearer` })
    store.commit('set_jwt', null)
  }
}
