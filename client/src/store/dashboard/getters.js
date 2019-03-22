export const getters = {
  mainChartData: (state, getters, rootState, rootGetters) => {
    const isPurchasesFetched = rootGetters['purchases/purchasesByMonth'].length
    const isSalesFetched = rootGetters['sales/salesByMonth'].length

    if (isPurchasesFetched && isSalesFetched) {
      return [
        { name: 'Compras', data: [ ...rootGetters['purchases/purchasesByMonth'].reduce((x, y) => [...x, y.total], []) ] },
        { name: 'Vendas', data: [ ...rootGetters['sales/salesByMonth'].reduce((x, y) => [...x, y.total], []) ] }
      ]
    }
  }
}
