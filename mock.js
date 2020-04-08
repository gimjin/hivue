import Mock from 'mockjs'

Mock.mock('/api/cat', function (option) {
  return {
    cat: 'Bella'
  }
})
