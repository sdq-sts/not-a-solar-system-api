const { lstatSync, readdirSync, existsSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source => readdirSync(source)
  .map(name => join(source, name))
  .filter(isDirectory)

// load all /api/**/model.js to db models
module.exports.applyDatasource = (app) => {
  const { db } = app
  const dirs = getDirectories(join(__dirname, '../api'))

  dirs.map(source => {
    const modelPath = join(source, 'model.js')

    if (existsSync(modelPath)) {
      require(modelPath)(db)
    }
  })
}
