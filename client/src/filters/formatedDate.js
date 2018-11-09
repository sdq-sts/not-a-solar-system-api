import Vue from 'vue'

var options = {
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}

const formatedDate = (d) => {
  const date = new Date(d)

  return date.toLocaleDateString('pt-BR', options)
}

Vue.filter('formatedDate', formatedDate)
