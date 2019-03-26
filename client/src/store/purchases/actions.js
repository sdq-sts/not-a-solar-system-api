import { apiService } from '@/services/'
import { handleAjaxErrors } from '@/utils/handleAjaxErrors'

export const actions = {
  async fetchPurchasesMeta (ctx) {
    const { commit } = ctx

    try {
      const { data: meta } = await apiService.get('/purchases/meta')
      commit('PURCHASES_BY_MONTH', meta.purchasesByMonth)
      commit('CONFIRMED_PURCHASES', meta.confirmedPurchases)
      commit('TOTAL_PURCHASES', meta.totalPurchases)
      commit('CONFIRMED_TOTAL_VALUE', meta.confirmedTotalValue)
      commit('PURCHASES_TOTAL_VALUE', meta.totalValue)

      return meta
    } catch (error) {
      handleAjaxErrors(error)
    }
  },

  async fetchPurchases (ctx, payload = { page: 1, limit: 3 }) {
    const { commit } = ctx
    const { page, limit } = payload
    const params = { page, limit }

    const purchases = await apiService.get('/purchases', { params })

    commit('PURCHASES', purchases.data)
  },

  createPurchase (ctx, payload) {
    return apiService.post('/purchases/', payload)
  },

  editPurchase (ctx, payload) {
    const { _id, ...params } = payload
    return apiService.put(`/purchases/${payload._id}`, params)
  },

  removePurchase (ctx, payload) {
    return apiService.delete(`/purchases/${payload._id}`)
  }
}
