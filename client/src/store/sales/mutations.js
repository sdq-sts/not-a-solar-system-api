import { initialState } from './state'

export const mutations = {
  RESET_SALES_STORE (state) {
    const IS = initialState()
    Object.keys(IS).forEach(x => { state[x] = IS[x] })
  },
  SALES: (state, sales) => { state.sales = sales },
  SALES_COUNT: (state, count) => { state.salesCount = count }
}
