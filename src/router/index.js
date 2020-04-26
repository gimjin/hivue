import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  /* eslint-disable */
  mode: ROUTER_MODE,
  base: ROUTER_BASE,
  /* eslint-enable */
  routes: [{
    path: '/',
    component: () => import('@/components/Parent.vue'),
    children: [{
      path: 'child',
      component: () => import('@/components/Child.vue')
    }]
  }]
})

router.beforeEach((to, from, next) => {
  console.info('SSR:', router.app.$isServer) // this.$isServer in router
  next()
})

export default router
