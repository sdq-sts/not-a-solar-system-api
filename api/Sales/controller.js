const moment = require('moment')
const HttpStatus = require('http-status')
const { defaultResponse, errorResponse, roundNumber, getLastMonths } = require('@/utils')
const { calcSoldProductsByMonth } = require('@/lib/Sales')

class SalesController {
  constructor (models) {
    const { Sale, Product } = models

    this.Sales = Sale
    this.Products = Product
  }

  async getAll (req) {
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1
    const queryParams = { ownerId: req.user.id }

    try {
      const sales = await this.Sales
        .find(queryParams)
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)
        .cache({ key: req.user.id })

      return defaultResponse(sales)
    } catch (error) {
      return errorResponse(error)
    }
  }

  async getById (req) {
    const queryParams = { _id: req.params.id }

    try {
      const sale = await this.Sales
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
      const newSale = await this.Sales
        .create(queryParams)

      const promisesList = products.map((product) => {
        const params = { _id: product.product }
        const amount = -product.amount

        return this.Products.updateOne(params, { $inc: { currentStorage: amount } })
      })

      await Promise.all(promisesList)

      return defaultResponse(newSale, HttpStatus.CREATED)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async update (req) {
    const queryParams = { _id: req.params.id }
    const modifiedFields = { ...req.body }

    try {
      const updatedProduct = await this.Sales
        .updateOne(queryParams, { $set: modifiedFields })

      return defaultResponse(updatedProduct)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async delete (req) {
    const queryParams = { _id: req.params.id }

    try {
      const removedProduct = await this.Sales
        .remove(queryParams)

      return defaultResponse(removedProduct, HttpStatus.NO_CONTENT)
    } catch (error) {
      errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getMetadata (req) {
    const ownerId = req.user.id
    const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1))

    try {
      const salesDocs = await this.Sales
        .find({ ownerId, status: 'confirmed', createdAt: { '$gte': startDate } })
        .populate('products.product')
        .cache({ key: req.user.id })

      const salesTotal = roundNumber(salesDocs.reduce((x, y) => x + y.total, 0))
      const salesCount = salesDocs.length
      const salesByMonth = getLastMonths().map(d => {
        const date = moment(d.start).format('MM/Y')
        const salesInMonth = salesDocs.filter(x => x.createdAt >= d.start && x.createdAt <= d.end)
        const total = salesInMonth.reduce((x, y) => x + y.total, 0)
        const productsSold = calcSoldProductsByMonth(salesInMonth)
        const sales = salesInMonth.length

        return { date, total, sales, productsSold }
      }).reverse()

      return defaultResponse({ salesCount, salesTotal, salesByMonth })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Object.assign({}, { SalesController })
