const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

module.exports = (req, target) => {
  const xhr = new XMLHttpRequest()
  // request mock url
  xhr.open(req.method, target + req._parsedUrl.pathname, false)
  xhr.send(null)
  // check mock api
  if (xhr.status !== 404) {
    return target
  }
}
