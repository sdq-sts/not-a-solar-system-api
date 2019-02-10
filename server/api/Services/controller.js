const uuid = require('uuid/v1')
const AWS = require('aws-sdk')
const { defaultResponse, errorResponse } = require('@/utils')

class ServicesController {
  constructor (app) {
    this.config = app.config
    this.S3 = new AWS.S3({
      accessKeyId: app.config.accessAwsKeyId,
      secretAccessKey: app.config.secretAwsKey
    })
  }

  async getUploadUrl (req) {
    const fileExt = req.query.fileType.split('/')[1]
    const folder = req.query.folder
    const key = `${folder}/${req.user.id}-${uuid()}.${fileExt}`
    const params = {
      Bucket: this.config.awsBucket,
      ContentType: req.query.fileType,
      Key: key,
      Expires: 60
    }

    try {
      const url = await this.S3.getSignedUrl('putObject', params)
      return defaultResponse({ key, url })
    } catch (error) {
      return errorResponse(error)
    }
    // this.S3.getSignedUrl('putObject', params, (err, url) => {
    //   if (err) return errorResponse(err)

    //   return defaultResponse({ key, url })
    // })
  }
}

module.exports = Object.assign({}, { ServicesController })
