import { apiService } from '@/services/'
import { handleAjaxErrors } from '@/utils/handleAjaxErrors'

export const actions = {
  async fetchSalesMeta (ctx) {
    const { commit } = ctx

    try {
      const { data: meta } = await apiService.get('/sales/meta')
      commit('SALES_COUNT', meta.salesCount)
      commit('SALES_BY_MONTH', meta.salesByMonth)
      commit('SALES_TOTAL', meta.salesTotal)

      return meta
    } catch (error) {
      handleAjaxErrors(error)
    }
  },

  async fetchSales (ctx, payload = { page: 1, limit: 3 }) {
    const { commit } = ctx
    const { page, limit } = payload
    const params = { page, limit }

    const sales = await apiService.get('/sales', { params })

    commit('SALES', sales.data)
  },

  createSale (ctx, payload) {
    return apiService.post('/sales/', payload)
  },

  editSale (ctx, payload) {
    const { _id, ...params } = payload
    return apiService.put(`/sales/${payload._id}`, params)
  },

  removeSale (ctx, payload) {
    return apiService.delete(`/sales/${payload._id}`)
  }
}
