import { initialState } from './state'

export const mutations = {
  RESET_ROOT_STORE (state) {
    const IS = initialState()
    Object.keys(IS).forEach(x => { state[x] = IS[x] })
  },
  set_userId: (state, id) => { state.userId = id },
  set_username: (state, name) => { state.username = name },
  set_userEmail: (state, email) => { state.userEmail = email },
  set_userAvatar: (state, url) => { state.userAvatar = url },
  set_isLoggedIn (state, value) { state.isLoggedIn = value },
  set_jwt (state, jwt) { state.jwt = jwt },
  set_snackbar (state, value) { state.snackbar = value },
  set_snackbarColor: (state, color) => { state.snackbarColor = color },
  set_snackbarText (state, text) { state.snackbarText = text }
}
