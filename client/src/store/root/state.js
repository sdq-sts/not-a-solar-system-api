export const initialState = () => ({
  company: 'Not a solar system',
  userId: '',
  username: '',
  userEmail: '',
  userAvatar: '',
  isLoggedIn: false,
  jwt: '',
  appMainColor: 'blue darken-2',
  appTextColor: 'white'
})

export const state = { ...initialState() }
