const { response, request } = require("express")

const loggingInfo = async (req = request, res = response, next) => {

  const { method, hostname, httpVersion, originalUrl} = req
  const queryParams = { ...req.query }
  console.log(method, httpVersion, hostname, originalUrl);
  console.log( "query", queryParams )
  next()
}

module.exports = {
    loggingInfo
}