const bcrypt = require('bcrypt')

// User Model
module.exports.userPreSave = async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (err) {
    return next(err)
  }
}

module.exports.userPreUpdate = async function (next) {
  const password = this.getUpdate().$set.password

  if (!password) {
    return next()
  }

  try {
    const hash = await bcrypt.hash(password, 10)

    this.getUpdate().$set.password = hash
    this.getUpdate().$set.updatedAt = Date.now()

    next()
  } catch (err) {
    return next(err)
  }
  next()
}

module.exports.isValidPassword = async function (password, hashedPassword) {
  const isValidPassword = await bcrypt.compare(password, hashedPassword)
  return isValidPassword
}

// Product Model
module.exports.productPreUpdate = function (next) {
  this._update.updatedAt = Date.now()
  next()
}

// Purchase model
module.exports.purchasePreSave = function (next) {
  const totalProducts = this.products
    .reduce((v, x) => (x.amount * x.cost) + v, 0)
  const value = totalProducts + this.tax - this.discount

  this.total = Math.round(value * 100 + Number.EPSILON) / 100
  next()
}

module.exports.purchasePreUpdate = function (next) {
  this._update.updatedAt = Date.now()
  next()
}
