const { Schema } = require('mongoose')
const { userPreUpdate, userPreSave } = require('../helpers/mongoose')

module.exports = (db) => {
  const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
  }, { versionKey: false })

  userSchema.pre('save', userPreSave)
  userSchema.pre('update', userPreUpdate)

  return db.model('User', userSchema)
}
