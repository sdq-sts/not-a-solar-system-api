const HttpStatus = require('http-status')
const moment = require('moment')
const { defaultResponse, errorResponse, roundNumber, getLastMonths } = require('@/utils')

class PurchasesController {
  constructor (models) {
    const { Purchase, Product } = models

    this.Purchases = Purchase
    this.Products = Product
  }

  async getAll (req) {
    const queryParams = { ownerId: req.user.id }
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1

    try {
      const purchases = await this.Purchases
        .find(queryParams)
        .sort('-createdAt')
        .populate('products.product', 'name')
        .skip((page - 1) * limit)
        .limit(limit)
        .cache({ key: req.user.id })

      return defaultResponse(purchases)
    } catch (error) {
      return errorResponse(error)
    }
  }

  async getById (req) {
    const queryParams = { _id: req.params.id }

    try {
      const sale = await this.Purchases
        .findOne(queryParams)
        .cache({ key: req.user.id })

      return defaultResponse(sale)
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  async create (req) {
    const queryParams = { ...req.body, ownerId: req.user.id }
    const products = queryParams.products

    try {
      const newPurchase = await this.Purchases.create(queryParams)

      if (queryParams.status === 'confirmed') {
        const promisesList = products.map((product) => {
          const params = { _id: product.product }
          const amount = product.amount

          return this.Products.updateOne(params, { $inc: { currentStorage: amount } })
        })

        await Promise.all(promisesList)
      }

      return defaultResponse(newPurchase, HttpStatus.CREATED)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async update (req) {
    const queryParams = { _id: req.params.id }
    const modifiedFields = { ...req.body }

    try {
      const purchase = await this.Purchases.findOneAndUpdate(queryParams, { $set: modifiedFields })
      const isSameStatus = (purchase.status === modifiedFields.status)
      const shouldAddProducts = (!isSameStatus && modifiedFields.status === 'confirmed') &&
        (purchase.changeStorage && purchase.isActive)
      const shouldRemoveProducts = (!isSameStatus && purchase.status === 'confirmed') &&
        (modifiedFields.status === 'pending' || modifiedFields.status === 'canceled') &&
        (purchase.changeStorage && purchase.isActive)
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

      if (shouldAddProducts) {
        const promisesList = purchase.products.map(incProductsMapper)

        await Promise.all(promisesList)
      } else if (shouldRemoveProducts) {
        const promiseList = purchase.products.map(decProductsMapper)

        await Promise.all(promiseList)
      }

      return defaultResponse(purchase)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async delete (req) {
    const queryParams = { _id: req.params.id }

    try {
      const removedPurchase = await this.Purchases.remove(queryParams)
      return defaultResponse(removedPurchase, HttpStatus.NO_CONTENT)
    } catch (error) {
      errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getMetadata (req) {
    const ownerId = req.user.id

    try {
      const purchasesDocs = await this.Purchases.find({ ownerId })
      const total = roundNumber(purchasesDocs.reduce((x, y) => x + y.total, 0))
      const purchasesCount = purchasesDocs.length
      const purchasesByMonth = getLastMonths().map(d => {
        const date = moment(d.start).format('MM/Y')
        const purchasesInMonth = purchasesDocs.filter(x => x.createdAt >= d.start && x.createdAt <= d.end)
        const total = purchasesInMonth.reduce((x, y) => x + y.total, 0)
        const purchases = purchasesInMonth.length

        return { date, total, purchases }
      }).reverse()

      return defaultResponse({
        total,
        purchasesCount,
        purchasesByMonth
      })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Object.assign({}, { PurchasesController })
