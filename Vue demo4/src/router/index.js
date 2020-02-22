import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Child',
      name: 'Child',
      component: () => import('@/components/child')
      //  import()   路由按需加载   路由懒加载
    }
  ]
})
