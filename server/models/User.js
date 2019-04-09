const { Schema } = require('mongoose')
const { userPreUpdateOne, userPreSave } = require('@/utils')

module.exports = (db) => {
  const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: false,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    birthday: {
      type: Date,
      required: false,
      default: ''
    },
    password: {
      type: String,
      required: true
    },
    darkMode: {
      type: Boolean,
      defaut: false
    }
  }, {
    timestamps: true,
    versionKey: false
  })

  userSchema.pre('save', userPreSave)
  userSchema.pre('updateOne', userPreUpdateOne)

  return db.model('User', userSchema)
}
