import { apiService } from '@/services/'
// import { handleAjaxErrors } from '@/utils/handleAjaxErrors'

export const actions = {
  async fetchPurchases (ctx, payload) {
    const { commit } = ctx
    const purchases = await apiService.get('/purchases')

    commit('PURCHASES', purchases.data)
  },

  editPurchase (ctx, payload) {
    const { _id, ...params } = payload
    return apiService.put(`/purchases/${payload._id}`, params)
  },

  removePurchase (ctx, payload) {
    return apiService.delete(`/purchases/${payload._id}`)
  }
}
