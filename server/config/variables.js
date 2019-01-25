module.exports.setVariables = (app) => {
  app.config = {
    redisUrl: process.env.REDIS_URL || '',
    redisPass: process.env.REDIS_PASS || '',
    redisExp: process.env.REDIS_EXP,
    port: process.env.PORT || 7777,
    dbURI: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URI : process.env.DB_URI,
    jwtSecret: process.env.NODE_ENV === 'test' ? process.env.JWT_TEST_SECRET : process.env.JWT_SECRET,
    jwtSession: { session: false },
    awsBucket: process.env.AWS_BUCKET,
    accessAwsKeyId: process.env.AWS_KEY_ID,
    secretAwsKey: process.env.AWS_SECRET_KEY
  }
}
