var express = require('express')
var proxy = require('http-proxy-middleware')

var apiProxy = proxy('/api', {
  target: 'http://localhost:3200',
  changeOrigin: true // for vhosted sites
})

var app = express()

app.use(apiProxy)
app.use(express.static('dist'))
app.listen(3300, function () {
  console.log('Data server listening on port 3300')
})
