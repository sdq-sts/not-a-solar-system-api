import { setAuthCredentials } from './setAuthCredentials'
import { verifyTokenValidity } from '@/utils/verifyTokenValidity'
import store from '@/store/'

export const handleAuthentication = async (to, from, next) => {
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const jwt = localStorage.getItem('jwt')

  if (routeRequiresAuth && jwt) {
    const isTokenValid = await verifyTokenValidity(jwt)

    if (isTokenValid) {
      store.commit('SET_LOGGEDIN', true)
      store.commit('SET_JWT', jwt)
      next()
    } else {
      next({ name: 'login' })
    }
  } else if (routeRequiresAuth && !jwt) {
    store.commit('SET_LOGGEDIN', false)
    next({ name: 'login', params: { nextUrl: to.fullPath } })
  } else {
    store.commit('SET_LOGGEDIN', false)
    setAuthCredentials()
    next()
  }
}
