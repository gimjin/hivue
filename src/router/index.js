import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  /* eslint-disable */
  base: BASE_ROUTER,
  /* eslint-enable */
  routes: [{
    path: '/',
    component: () => import('@/components/index/index.vue'),
    children: [{
      path: 'child',
      component: () => import('@/components/Child.vue')
    }]
  }]
})
