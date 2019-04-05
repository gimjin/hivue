var express = require('express')
var app = express()

app.get('/api/cat', function (req, res) {
  res.json({ 'cat': '加菲猫' })
})

app.post('/api/list', function (req, res) {
  res.json({
    'list': [
      { 'name': '此接口正在开发中' },
      { 'name': '此数据会被mock数据拦截' },
      { 'name': '如果看到此数据证明配置错误' },
      { 'name': '或者是真实的生产环境' }
    ]
  })
})

app.listen(3200, function () {
  console.log('Data server listening on port 3200')
})
