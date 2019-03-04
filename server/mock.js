var Mock = require('mockjs')
var express = require('express')
var app = express()

app.post('/api/list', function (req, res) {
  res.json(Mock.mock({
    'list|0-5': [{
      'name': Mock.Random.ctitle()
    }]
  }))
})

app.listen(3100, function () {
  console.log('Mock server listening on port 3100')
})
