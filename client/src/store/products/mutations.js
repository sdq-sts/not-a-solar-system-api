import { initialState } from './state'

export const mutations = {
  RESET_PRODUCTS_STORE (state) {
    const IS = initialState()
    Object.keys(IS).forEach(x => { state[x] = IS[x] })
  },
  PRODUCTS (state, products) { state.products = products },
  PRODUCTS_COUNT (state, amount) { state.productsCount = amount }
}
