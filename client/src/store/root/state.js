export const initialState = () => ({
  awsUrl: 'https://s3-sa-east-1.amazonaws.com',
  awsBucket: 'not-a-solar-system',
  company: 'Not a solar system',
  user: {},
  userId: '',
  username: '',
  userEmail: '',
  userAvatar: '',
  defaultAvatar: require('@/assets/default_avatar.png'),
  isLoggedIn: false,
  jwt: '',
  darkMode: false,
  snackbar: false,
  snackbarText: '',
  snackbarColor: 'info',
  snackbarTimeout: 2000
})

export const state = { ...initialState() }
