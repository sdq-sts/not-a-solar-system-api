const HttpStatus = require('http-status')
const { defaultResponse, errorResponse } = require('../../helpers/responses')

class PurchasesController {
  constructor (models) {
    const { Purchase, Product } = models

    this.Purchases = Purchase
    this.Products = Product
  }

  async getAll (req) {
    const queryParams = { ownerId: req.user.id }
    const limit = parseInt(req.query.limit) || 30
    const page = parseInt(req.query.page) || 1

    try {
      const purchases = await this.Purchases
        .find(queryParams)
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)

      return defaultResponse(purchases)
    } catch (error) {
      return errorResponse(error)
    }
  }

  async create (req) {
    const queryParams = { ...req.body, ownerId: req.user.id }
    const products = queryParams.products

    try {
      const newPurchase = await this.Purchases.create(queryParams)

      if (queryParams.status === 'confirmed') {
        const promisesList = products.map((product) => {
          const params = { _id: product.productId }
          const amount = product.amount

          return this.Products.updateOne(params, { $inc: { currentStorage: amount } }).exec()
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

      if (modifiedFields.status === 'confirmed' && purchase.status !== 'confirmed') {
        const promisesList = purchase.products.map((product) => {
          const params = { _id: product.productId }
          const amount = product.amount

          return this.Products.updateOne(params, { $inc: { currentStorage: amount } }).exec()
        })

        await Promise.all(promisesList)
      } else if (
        (modifiedFields.status !== 'pending' || modifiedFields.status !== 'canceled') &&
        (purchase.status !== 'pending' || purchase.status !== 'canceled') &&
        (modifiedFields.status !== 'confirmed')) {
        const promiseList = purchase.products.map((product) => {
          const params = { _id: product.productId }
          const amount = product.amount * -1

          return this.Products.updateOne(params, { $inc: { currentStorage: amount } }).exec()
        })

        await Promise.all(promiseList)
      }

      return defaultResponse(purchase)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getById (req) {
    const queryParams = { _id: req.params.id }

    try {
      const sale = await this.Purchases.findOne(queryParams)
      return defaultResponse(sale)
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  async delete (req) {
    const queryParams = { _id: req.params.id }

    try {
      const removedProduct = await this.Purchases.remove(queryParams)
      return defaultResponse(removedProduct, HttpStatus.NO_CONTENT)
    } catch (error) {
      errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getMetadata (req) {
    const userId = req.user.id

    try {
      const documentCount = await this.Purchases.countDocuments({ ownerId: userId })
      return defaultResponse({ purchasesCount: documentCount })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Object.assign({}, { PurchasesController })
