import Vue from 'vue'
import Vuex from 'vuex'
import purchases from './purchases'
import products from './products'
import sales from './sales'
import { state, getters, mutations, actions } from './root'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    purchases,
    products,
    sales
  },
  state,
  getters,
  mutations,
  actions
})
