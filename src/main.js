import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import PortalVue from 'portal-vue'
import router from '@/router'
import store from '@/store'
import axios from '@/axios'
import App from '@/App'

Vue.use(ElementUI)
Vue.use(PortalVue)
Vue.prototype.$axios = axios
Vue.config.productionTip = process.env.NODE_ENV !== 'production'

new Vue({
  render: function (h) {
    return h(App)
  },
  router,
  store
}).$mount('#app')
