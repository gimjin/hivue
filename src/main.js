import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/App.vue'
import i18n from '@/i18n'

Vue.use(Vuex)

const store = new Vuex.Store({})

const vm = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
  i18n
})

Vue.use(vm)
