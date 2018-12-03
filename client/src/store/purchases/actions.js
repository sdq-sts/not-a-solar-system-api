import { apiService } from '@/services/'
// import { handleAjaxErrors } from '@/utils/handleAjaxErrors'

export const actions = {
  async fetchPurchases (ctx, payload) {
    const { commit } = ctx
    const purchases = await apiService.get('/purchases')

    commit('SET_PURCHASES', purchases.data)
  },

  removePurchase (ctx, payload) {
    return apiService.delete(`/purchases/${payload._id}`)
  }
}
