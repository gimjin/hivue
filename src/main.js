import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/App.vue'
import i18n from '@/i18n'
import 'normalize.css/normalize.css'
import 'minireset.css/minireset.css'
import '@/assets/style.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)

const store = new Vuex.Store({})

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
  store: store,
  i18n: i18n
}).$mount('#app')
