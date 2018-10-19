const HttpStatus = require('http-status')
const { defaultResponse, errorResponse } = require('../../helpers/responses')

class UsersController {
  constructor (UsersModel) {
    this.Users = UsersModel
  }

  async getAll (req) {
    const params = {}

    try {
      const users = await this.Users.find(params, '-password')
      return defaultResponse(users)
    } catch (error) {
      return errorResponse(error)
    }
  }

  async create (req) {
    const params = { ...req.body }

    try {
      const newUser = await this.Users.create(params)
      return defaultResponse(newUser, HttpStatus.CREATED)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async getById (req) {
    const params = { _id: req.params.id }

    try {
      const user = await this.Users.findOne(params, '-password')
      return defaultResponse(user)
    } catch (error) {
      return errorResponse(error.message)
    }
  }

  async update (req) {
    const params = { _id: req.params.id }
    const modifiedFields = { ...req.body }

    try {
      const updatedUser = await this.Users.update(params, { $set: modifiedFields })
      return defaultResponse(updatedUser)
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  async delete (req) {
    const params = { _id: req.params.id }

    try {
      const removedUser = await this.Users.remove(params)
      return defaultResponse(removedUser, HttpStatus.NO_CONTENT)
    } catch (error) {
      errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }
}

// `Object.assign({}, { UsersController })` is considered a best practice,
// because it doesn't allow object properties to be modified
module.exports = Object.assign({}, { UsersController })
