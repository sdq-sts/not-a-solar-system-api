import Vue from 'vue'

const options = {
  year: 'numeric',
  month: '2-digit',
  day: 'numeric'
}

const formatedDate = (d) => {
  const date = new Date(d)

  return date.toLocaleDateString('pt-BR', options)
}

Vue.filter('formatedDate', formatedDate)
