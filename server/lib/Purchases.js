const incProductsMapper = (product) => {
  const params = { _id: product.product }
  const amount = product.amount

  return this.Products.updateOne(params, { $inc: { currentStorage: amount } })
}

const decProductsMapper = (product) => {
  const params = { _id: product.product }
  const amount = product.amount * -1

  return this.Products.updateOne(params, { $inc: { currentStorage: amount } })
}

module.exports.incProducts = (products) => {
  return products.map(incProductsMapper)
}

module.exports.decProducts = (products) => {
  return products.map(decProductsMapper)
}
