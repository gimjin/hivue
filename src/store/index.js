import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import getter from './getter.js'
import mutation from './mutation.js'
import action from './action.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getter,
  mutation,
  action
})
