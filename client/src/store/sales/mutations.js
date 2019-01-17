import { initialState } from './state'

export const mutations = {
  RESET_SALES_STORE (state) {
    const IS = initialState()
    Object.keys(IS).forEach(x => { state[x] = IS[x] })
  },
  SALES: (state, sales) => { state.sales = sales },
  SALES_TOTAL: (state, value) => { state.salesTotal = value },
  SALES_COUNT: (state, count) => { state.salesCount = count },
  SALES_BY_MONTH: (state, sales) => { state.salesByMonth = sales }
}
