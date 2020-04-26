export default {
  UPDATE_NAME (state, name) {
    this._vm.$set(state.cat, 'name', name) // this.$set() in mutations
    // state.cat = Object.assign({}, state.cat, { name: name })
  }
}
