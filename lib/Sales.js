const { roundNumber } = require('@/utils')

module.exports.calcSoldProductsByMonth = (salesArray) => {
  return salesArray.reduce((x, y) => {
    y.products.forEach(p => {
      const id = ((p || {}).product || {})._id
      const productName = ((p || {}).product || {}).name || ''
      const amount = p.amount || 0
      const salePrice = p.salePrice || 0
      const value = amount * salePrice

      if (!x[id]) {
        x[id] = { name: '', amount: 0, value: 0 }
        x[id].name = productName
        x[id].amount += amount
        x[id].value = roundNumber((x[id].value + value))
      } else {
        x[id].name = productName
        x[id].amount += amount
        x[id].value = roundNumber((x[id].value + value))
      }
    })

    return x
  }, {})
}
