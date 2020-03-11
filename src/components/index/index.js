import api from '@/axios/api'

export default {
  name: 'App',
  data: function () {
    return {
      name: ''
    }
  },
  mounted () {
    console.log('Only NODE_ENV=development show log.')
    this.$axios
      .post(api.cat)
      .then(res => {
        this.name = res.data.cat
      })
  }
}
