import { initialState } from './state'

export const mutations = {
  RESET_PURCHASES_STORE (state) {
    const IS = initialState()
    Object.keys(IS).forEach(x => { state[x] = IS[x] })
  },
  PURCHASES: (state, purchases) => { state.purchases = purchases },
  CONFIRMED_PURCHASES: (state, count) => { state.confirmedPurchases = count },
  TOTAL_PURCHASES: (state, count) => { state.totalPurchases = count },
  CONFIRMED_TOTAL_VALUE: (state, value) => { state.confirmedTotalValue = value },
  PURCHASES_TOTAL_VALUE: (state, totalValue) => { state.purchasesTotalValue = totalValue },
  PURCHASES_BY_MONTH: (state, purchases) => { state.purchasesByMonth = purchases }
}
