const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

module.exports = (req, target) => {
  const xhr = new XMLHttpRequest()
  // 同步请求地址
  xhr.open(req.method, target + req._parsedUrl.pathname, false)
  xhr.send(null)
  // 如果mock服务器返回404表示无api
  if (xhr.status !== 404) {
    return target
  }
}
