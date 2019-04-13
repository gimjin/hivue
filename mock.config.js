const Mock = require('mockjs')

Mock.mock('/api/list', 'get', {
  'list|0-9': [{
    'name': Mock.Random.ctitle()
  }]
})
