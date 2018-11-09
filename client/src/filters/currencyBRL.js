import Vue from 'vue'

const options = {
  style: 'currency',
  currency: 'BRL'
}

const currencyBRL = (v) => v.toLocaleString('pt-BR', options)

Vue.filter('currencyBRL', currencyBRL)
