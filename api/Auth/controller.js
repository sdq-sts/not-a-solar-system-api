const jwt = require(`jsonwebtoken`)
const HttpStatus = require('http-status')
const { defaultResponse, errorResponse, isValidPassword } = require('@/utils')

class AuthController {
  constructor (models, jwtSecret) {
    const { User } = models

    this.Users = User
    this.jwtSecret = jwtSecret
  }

  async validatePassword (req) {
    const { email, password } = req.body

    if (email && password) {
      const user = await this.Users.findOne({ email })
      const validPassword = user
        ? await isValidPassword(password, user.password)
        : false

      return validPassword
        ? defaultResponse({})
        : errorResponse('Não autorizado', HttpStatus.UNAUTHORIZED)
    }

    return errorResponse('Não autorizado', HttpStatus.UNAUTHORIZED)
  }

  async authenticate (req) {
    const { email, password } = req.body

    if (email && password) {
      const user = await this.Users.findOne({ email })
      const validPassword = user
        ? await isValidPassword(password, user.password)
        : false

      if (user && validPassword) {
        const payload = { id: user.id, email: user.email, darkMode: user.darkMode }
        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '12h' })
        const { id, name, email } = user

        return defaultResponse({ id, name, email, token })
      } else {
        return errorResponse('Não autorizado', HttpStatus.UNAUTHORIZED)
      }
    } else {
      return errorResponse('Não autorizado', HttpStatus.UNAUTHORIZED)
    }
  }
}

module.exports = Object.assign({}, { AuthController })
