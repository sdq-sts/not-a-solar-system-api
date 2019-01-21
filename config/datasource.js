const fs = require('fs')
const path = require('path')

module.exports.applyDatasource = (app) => {
  const modelsDir = path.join(__dirname, '../models')
  const { db } = app

  fs.readdirSync(modelsDir)
    .map((file) => {
      const modelPath = path.join(modelsDir, file)
      const model = require(modelPath)

      model(db)
    })
}
