module.exports.setVariables = (app) => {
  const isProduction = process.env.NODE_ENV === 'production'

  app.config = {
    port: process.env.PORT || 7777,
    redisExp: process.env.REDIS_EXP,
    redisUrl: isProduction ? process.env.REDIS_PROD_URL : process.env.REDIS_DEV_URL,
    redisPass: isProduction ? process.env.REDIS_PROD_PASS : process.env.REDIS_DEV_PASS,
    dbURI: isProduction ? process.env.DB_PROD_URI : process.env.DB_DEV_URI,
    jwtSecret: isProduction ? process.env.JWT_PROD_SECRET : process.env.JWT_DEV_SECRET,
    awsBucket: isProduction ? process.env.AWS_BUCKET : process.env.AWS_DEV_BUCKET,
    accessAwsKeyId: isProduction ? process.env.AWS_KEY_ID : process.env.AWS_DEV_KEY_ID,
    secretAwsKey: isProduction ? process.env.AWS_SECRET_KEY : process.env.AWS_DEV_SECRET_KEY,
    jwtSession: { session: false }
  }

  log.info('App variables are set!')
}
