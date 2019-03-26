export const initialState = () => ({
  purchases: [],
  confirmedPurchases: 0,
  totalPurchases: 0,
  purchasesTotalValue: 0,
  confirmedTotalValue: 0,
  purchasesByMonth: []
})

export const state = { ...initialState() }
