import api from '@/axios/api'

export default {
  async syncName (context) {
    await this._vm.$axios // this.$axios in actions
      .post(api.cat)
      .then(res => {
        context.commit('UPDATE_NAME', res.data.cat)
      })
    return 'Set name successful.'
  }
}
