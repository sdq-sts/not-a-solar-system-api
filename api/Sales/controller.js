const HttpStatus = require('http-status')
const moment = require('moment')
const { defaultResponse, errorResponse } = require('../../helpers/responses')
const { roundNumber } = require('../../helpers/utils')

moment.locale('pt-br')

class SalesController {
  constructor (models) {
    const { Sale, Product } = models

    this.Sales = Sale
    this.Products = Product
  }

  async getAll (req) {
    const limit = parseInt(req.query.limit) || 30
    const page = parseInt(req.query.page) || 1
    const queryParams = { ownerId: req.user.id }

    try {
      const sales = await this.Sales
        .find(queryParams)
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)

      return defaultResponse(sales)
    } catch (error) {
      return errorResponse(error)
    }
  }

  async create (req) {
    const queryParams = { ...req.body, ownerId: req.user.id }
    const products = queryParams.products

    try {
      const newSale = await this.Sales.create(queryParams)

      const promisesList = products.map((product) => {
        const params = { _id: product.product }
        const amount = -product.amount

        return this.Products.updateOne(params, { $inc: { currentStorage: amount } }).exec()
      })

      await Promise.all(promisesList)

      return defaultResponse(newSale, HttpStatus.CREATED)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getById (req) {
    const queryParams = { _id: req.params.id }

    try {
      const sale = await this.Sales.findOne(queryParams)
      return defaultResponse(sale)
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  async update (req) {
    const queryParams = { _id: req.params.id }
    const modifiedFields = { ...req.body }

    try {
      const updatedProduct = await this.Sales.update(queryParams, { $set: modifiedFields })
      return defaultResponse(updatedProduct)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async delete (req) {
    const queryParams = { _id: req.params.id }

    try {
      const removedProduct = await this.Sales.remove(queryParams)
      return defaultResponse(removedProduct, HttpStatus.NO_CONTENT)
    } catch (error) {
      errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getMetadata (req) {
    const ownerId = req.user.id

    try {
      const docs = await this.Sales.find({ ownerId })
      const salesTotal = roundNumber(docs.reduce((x, y) => x + y.total, 0))
      const salesCount = docs.length
      const datesArr = Array.from({ length: 12 }, (v, k) => k + 1)
      const allMonths = datesArr.map((x) => ({
        start: new Date(moment().subtract(x, 'months').startOf('month').toISOString()),
        end: new Date(moment().subtract(x, 'months').endOf('month').toISOString())
      }))

      const salesByMonth = allMonths.map(d => {
        const date = moment(d.start).format('MMMM Y')
        const total = docs
          .filter(x => x.createdAt >= d.start && x.createdAt <= d.end)
          .reduce((x, y) => x + y.total, 0)

        return { date, total }
      }).reverse()

      return defaultResponse({ salesCount, salesTotal, salesByMonth })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Object.assign({}, { SalesController })
