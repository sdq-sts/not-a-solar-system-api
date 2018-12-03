import { initialState } from './state'

export const mutations = {
  RESET_PURCHASES_STORE (state) {
    const IS = initialState()
    Object.keys(IS).forEach(x => { state[x] = IS[x] })
  },
  SET_PURCHASES: (state, purchases) => { state.purchases = purchases }
}
