import Vue from 'vue'

const options = {
  style: 'currency',
  currency: 'BRL'
}

const currencyBRL = (v) => v
  ? v.toLocaleString('pt-BR', options)
  : (0).toLocaleString('pt-BR', options)

Vue.filter('currencyBRL', currencyBRL)

export default currencyBRL
