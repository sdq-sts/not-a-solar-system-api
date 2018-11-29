const express = require('express')
const router = express.Router()
const uuid = require('uuid/v1')
const AWS = require('aws-sdk')

module.exports = (app) => {
  const s3 = new AWS.S3({
    accessKeyId: app.config.accessAwsKeyId,
    secretAccessKey: app.config.secretAwsKey
  })

  router.get('/upload',
    app.auth.authenticate(),
    (req, res) => {
      const fileExt = req.query.fileType.split('/')[1]
      const folder = req.query.folder
      const key = `${folder}/${uuid()}.${fileExt}`
      const params = {
        Bucket: `not-a-solar-system`,
        ContentType: req.query.fileType,
        Key: key,
        Expires: 60
      }

      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) return err
        res.json({ key, url })
      })
    })

  return router
}
