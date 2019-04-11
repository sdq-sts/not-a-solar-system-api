module.exports.setVariables = (app) => {
  const isProduction = process.env.NODE_ENV === 'production'

  app.config = {
    redisUrl: isProduction ? process.env.REDIS_PROD_URL : process.env.REDIS_DEV_URL,
    redisPass: isProduction ? process.env.REDIS_PROD_PASS : process.env.REDIS_DEV_PASS,
    redisExp: process.env.REDIS_EXP,
    port: process.env.PORT || 7777,
    dbURI: isProduction ? process.env.DB_PROD_URI : process.env.DB_DEV_URI,
    jwtSecret: isProduction ? process.env.JWT_PROD_SECRET : process.env.JWT_DEV_SECRET,
    jwtSession: { session: false },
    awsBucket: process.env.AWS_BUCKET,
    accessAwsKeyId: process.env.AWS_KEY_ID,
    secretAwsKey: process.env.AWS_SECRET_KEY
  }
}
