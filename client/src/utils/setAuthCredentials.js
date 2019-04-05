import { apiService } from '@/services/'
import store from '@/store/'

export const setAuthCredentials = (data) => {
  const jwt = localStorage.getItem('jwt')
  const isDarkMode = (localStorage.isDarkMode === 'true')
  store.commit('SET_DARK_MODE', isDarkMode)

  if (data) {
    apiService.setDefaultHeaders({ 'Authorization': `Bearer ${jwt}` })
    localStorage.setItem('user', JSON.stringify({ email: data.email, id: data.id }))
    localStorage.setItem('jwt', data.token)
    store.commit('SET_JWT', data.token)
  } else if (!data && jwt) {
    apiService.setDefaultHeaders({ 'Authorization': `Bearer ${jwt}` })
    store.commit('SET_JWT', jwt)
  } else {
    apiService.setDefaultHeaders({ 'Authorization': `Bearer` })
    store.commit('SET_JWT', null)
  }
}
