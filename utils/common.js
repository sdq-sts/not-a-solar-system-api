const moment = require('moment')

module.exports.roundNumber = (x) => Math.round(x * 100 + Number.EPSILON) / 100

module.exports.getLastMonths = (n = 13) => {
  const datesArr = Array.from({ length: n }, (v, k) => k)
  const allMonths = datesArr.map((x) => ({
    start: new Date(moment().subtract(x, 'months').startOf('month').toISOString()),
    end: new Date(moment().subtract(x, 'months').endOf('month').toISOString())
  }))

  return allMonths
}

module.exports.stringifyFilter = (key, value) => {
  return value instanceof RegExp ? value.toString() : value
}
