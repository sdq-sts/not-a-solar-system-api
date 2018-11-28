export const getters = {
  jwt: (state) => state.jwt,
  userId: (state) => state.userId,
  company: (state) => state.company,
  username: (state) => state.username,
  userEmail: (state) => state.userEmail,
  userAvatar: (state) => state.userAvatar,
  isLoggedIn: (state) => state.isLoggedIn,
  appMainColor: (state) => state.appMainColor,
  isDarkTheme: (state) => state.isDarkTheme,
  snackbar: (state) => state.snackbar,
  snackbarText: (state) => state.snackbarText,
  snackbarColor: (state) => state.snackbarColor,
  productsList: (state) => state.productsList,
  productsCount: (state) => state.productsCount,
  awsBucketUrl: (state) => `${state.awsUrl}/${state.awsBucket}`
}
