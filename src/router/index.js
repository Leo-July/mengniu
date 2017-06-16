import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('@/views/HomeView'))
        })
      }
    },
    {
      path: '/foreshow',
      name: 'foreshow',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('@/views/foreshow'))
        })
      }
    }
  ]
})
