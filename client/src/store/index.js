import Vue from 'vue'
import Vuex from 'vuex'
import purchases from './purchases'
import products from './products'
import { state, getters, mutations, actions } from './root'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    purchases,
    products
  },
  state,
  getters,
  mutations,
  actions
})
