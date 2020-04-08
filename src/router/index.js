import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  /* eslint-disable */
  mode: ROUTER_MODE,
  base: ROUTER_BASE,
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
