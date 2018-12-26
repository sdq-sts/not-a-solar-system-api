const { Schema } = require('mongoose')

module.exports = (db) => {
  const productSchema = new Schema({
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      required: true,
      type: String,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      trim: true,
      maxlength: 255
    },
    image: {
      type: String,
      default: ''
    },
    barCode: {
      type: String,
      trim: true,
      maxlength: 20
    },
    internalCode: {
      type: String,
      trim: true,
      maxlength: 20,
      required: true
    },
    changeStorage: {
      type: Boolean,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    costPrice: {
      type: Number,
      required: true
    },
    salePrice: {
      type: Number,
      required: true
    },
    weight: {
      type: Number
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    depth: {
      type: Number
    },
    minStorage: {
      required: true,
      type: Number
    },
    maxStorage: {
      required: true,
      type: Number
    },
    currentStorage: {
      required: true,
      type: Number
    }
  }, {
    timestamps: true,
    versionKey: false
  })

  return db.model('Product', productSchema)
}
