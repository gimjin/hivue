import Mock from 'mockjs'

Mock.mock('/api/cat', 'post', function (option) {
  return {
    cat: 'Bella'
  }
})
