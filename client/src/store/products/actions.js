import { apiService } from '@/services/'
import { handleAjaxErrors } from '@/utils/handleAjaxErrors'

export const actions = {
  async fetchProductsMeta (ctx) {
    const { commit } = ctx

    try {
      const { data: meta } = await apiService.get('/products/meta')
      commit('PRODUCTS_COUNT', meta['productsCount'])

      return meta
    } catch (error) {
      handleAjaxErrors(error)
    }
  },

  async fetchProducts (ctx, payload = { page: 1, limit: 3, search: '' }) {
    const { commit } = ctx
    const { page, limit, search } = payload
    const params = { page, limit, search }

    try {
      const { data: products } = await apiService.get('/products', { params })
      commit('PRODUCTS', products)

      return products
    } catch (error) {
      handleAjaxErrors(error)
      return error
    }
  },

  async getProduct (ctx, id) {
    return apiService.get(`/products/${id}`)
  },

  createProduct (ctx, payload) {
    return apiService.post('/products/', payload)
  },

  updateProduct (ctx, payload) {
    const { _id, ...data } = payload

    return apiService.put(`/products/${_id}`, data)
  },

  deleteProduct (ctx, payload) {
    return apiService.delete(`/products/${payload._id}`)
  }
}
