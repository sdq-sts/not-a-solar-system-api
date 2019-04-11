const { lstatSync, readdirSync, existsSync } = require('fs')
const { join } = require('path')
const modelsFolder = join(__dirname, '../models')

const isDirectory = source => lstatSync(source).isDirectory()

// load all /models/*.js to db models
module.exports.applyDatasource = (app) => {
  const { db } = app

  readdirSync(modelsFolder).forEach(file => {
    const modelPath = join(modelsFolder, file)

    if (!isDirectory(modelPath) && existsSync(modelPath)) {
      require(modelPath)(db)
    }
  })

  log.info('Models successfully added!')
}
