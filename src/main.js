import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import store from '@/store'
import axios from '@/axios'
import App from '@/App'

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = !PROD_MODE // eslint-disable-line

new Vue({
  render: function (h) {
    return h(App)
  },
  router,
  store
}).$mount('#app')
