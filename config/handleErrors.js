process.on('uncaughtException', (error) => {
  log.error('A uncaught exception happened: ', error)
  process.exit(1)
})

process.on('unhandledRejection', (error, promise) => {
  log.error('Forgot to handle a promise rejection here: ', promise)
  log.error('The error was: ', error)
})
