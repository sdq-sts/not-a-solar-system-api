import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './filters/currencyBRL'
import './filters/formatedDate'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
