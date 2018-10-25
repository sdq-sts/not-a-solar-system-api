import { setAuthCredentials } from './setAuthCredentials'
import store from '@/store/'

export const handleAuthentication = (to, from, next) => {
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const jwt = localStorage.getItem('jwt')

  if (routeRequiresAuth && jwt) {
    store.commit('set_isLoggedIn', true)
    setAuthCredentials()
    next()
  } else if (routeRequiresAuth && !jwt) {
    store.commit('set_isLoggedIn', false)
    next({ name: 'login', params: { nextUrl: to.fullPath } })
  } else {
    store.commit('set_isLoggedIn', false)
    setAuthCredentials()
    next()
  }
}
