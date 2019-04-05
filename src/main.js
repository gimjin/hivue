import Vue from 'vue'
import App from '@/App'
import axios from '@/axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) }
}).$mount('#app')
