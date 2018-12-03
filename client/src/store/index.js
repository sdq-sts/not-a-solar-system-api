import Vue from 'vue'
import Vuex from 'vuex'
import purchases from './purchases'
import { state, getters, mutations, actions } from './root'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    purchases
  },
  state,
  getters,
  mutations,
  actions
})
