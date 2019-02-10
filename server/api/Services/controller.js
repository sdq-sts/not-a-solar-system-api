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
    const fileExt = req.query.fileType ? req.query.fileType.split('/')[1] : false
    const folder = req.query.folder
    const key = `${folder}/${req.user.id}-${uuid()}.${fileExt}`
    const params = {
      Bucket: this.config.awsBucket,
      ContentType: req.query.fileType,
      Key: key,
      Expires: 60
    }

    if (!fileExt || folder) {
      return errorResponse('File extension or folder not specified')
    }

    try {
      const url = await this.S3.getSignedUrl('putObject', params)
      return defaultResponse({ key, url })
    } catch (error) {
      return errorResponse(error)
    }
  }
}

module.exports = Object.assign({}, { ServicesController })
