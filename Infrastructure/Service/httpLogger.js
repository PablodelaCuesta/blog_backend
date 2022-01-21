const morgan = require('morgan')
const json = require('morgan-json')


const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})

const logger = require('./logging')
const httpLogger = morgan( format, {
    stream: {
        write: (msg) => {
            const {
                method,
                url,
                status,
                contentLength,
                responseTime
            } = JSON.parse(msg)

            logger.info('HTTP Acess Log', {
                timestamp: new Date().toString(),
                method,
                url,
                status: Number(status),
                contentLength,
                responseTime: Number(responseTime)
            })
        }
    }
})

module.exports = httpLogger