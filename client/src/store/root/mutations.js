import { initialState } from './state'

export const mutations = {
  RESET_ROOT_STORE (state) {
    const IS = initialState()
    Object.keys(IS).forEach(x => { state[x] = IS[x] })
  },
  SET_DARK_MODE (state, bool) {
    localStorage.setItem('isDarkMode', bool)
    state.darkMode = bool
  },
  SET_JWT (state, jwt) { state.jwt = jwt },
  SET_USER (state, user) { state.user = user },
  SET_USER_ID (state, id) { state.userId = id },
  SET_USER_NAME (state, name) { state.username = name },
  SET_USER_EMAIL (state, email) { state.userEmail = email },
  SET_USER_AVATAR (state, url) { state.userAvatar = url },
  SET_LOGGEDIN (state, value) { state.isLoggedIn = value },
  SET_SNACKBAR (state, value) { state.snackbar = value },
  SET_SNACKBAR_COLOR (state, color) { state.snackbarColor = color },
  SET_SNACKBAR_TEXT (state, text) { state.snackbarText = text }
}
