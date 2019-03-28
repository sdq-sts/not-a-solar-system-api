export const getters = {
  mainChartData: (state, getters, rootState, rootGetters) => {
    const isPurchasesFetched = !!rootGetters['purchases/purchasesByMonth'].length
    const isSalesFetched = !!rootGetters['sales/salesByMonth'].length

    if (isPurchasesFetched && isSalesFetched) {
      return [
        { name: 'Compras', data: [ ...rootGetters['purchases/purchasesByMonth'].reduce((x, y) => [...x, y.total], []) ] },
        { name: 'Vendas', data: [ ...rootGetters['sales/salesByMonth'].reduce((x, y) => [...x, y.total], []) ] }
      ]
    }
  },
  period: (state, getters, rootState, rootGetters) => {
    return rootGetters['purchases/purchasesByMonth'].reduce((x, y) => [...x, y.date], [])
  },
  mostSoldProducts: (state, getters, rootState, rootGetters) => {
    const sales = rootGetters['sales/salesByMonth'].reduce((x, y) => {
      const obj = y.productsSold

      for (const id in obj) {
        if (!x[id]) {
          x[id] = { name: '', amount: '', value: '' }
          x[id].name = obj[id].name
          x[id].value = obj[id].value
          x[id].amount = obj[id].amount
        } else {
          x[id].value += obj[id].value
          x[id].amount += obj[id].amount
        }
      }

      return x
    }, {})

    return sales || []
  }
}
