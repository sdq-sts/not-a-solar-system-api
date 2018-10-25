import { initialState } from './state'

export const mutations = {
  RESET_STORE (state) {
    const IS = initialState()
    Object.keys(IS).forEach(x => { state[x] = IS[x] })
  },
  set_isLoggedIn (state, value) {
    state.isLoggedIn = value
  },
  set_jwt (state, jwt) {
    state.jwt = jwt
  }
}
