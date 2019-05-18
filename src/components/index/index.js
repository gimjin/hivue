import api from '@/axios/api'

export default {
  name: 'App',
  data: function () {
    return {
      name: 'British shorthair'
    }
  },
  mounted () {
    this.$axios
      .post(api.cat)
      .then(res => {
        this.name = res.data.cat
      })
  }
}
