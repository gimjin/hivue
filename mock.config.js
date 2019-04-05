const Mock = require('mockjs')
const express = require('express')
const app = express()

app.listen(7070)

app.get('/api/cat', function (req, res) {
  res.json(Mock.mock({
    'list|0-9': [{
      'name': Mock.Random.ctitle()
    }]
  }))
})
