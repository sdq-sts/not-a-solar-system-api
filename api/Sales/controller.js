const HttpStatus = require('http-status')
const { defaultResponse, errorResponse } = require('../../helpers/responses')

class SalesController {
  constructor (models) {
    const { Sale } = models

    this.Sales = Sale
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
      console.log(error)
      return errorResponse(error)
    }
  }

  async create (req) {
    const queryParams = { ...req.body, ownerId: req.user.id }

    try {
      const newSale = await this.Sales.create(queryParams)
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
    const userId = req.user.id

    try {
      const documentCount = await this.Sales.countDocuments({ ownerId: userId })
      return defaultResponse({ salesCount: documentCount })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Object.assign({}, { SalesController })
