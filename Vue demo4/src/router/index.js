import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Keeps from '@/components/keepAlive/a'
import KeepB from '@/components/keepAlive/b'
import KeepC from '@/components/keepAlive/c'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Child',
      name: 'Child',
      component: () => import('@/components/child'),
      beforeEnter: (to, from, next) => {
        to.meta.lastHistoryFullPath = to.fullPath
        // console.log(to, from)
        next()
      },
      meta: {
        keepAlive: false
      }
      //  import()   路由按需加载   路由懒加载
    },
    {
      path: '/keep',
      name: 'Keeps',
      component: Keeps,
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: '/keep/b',
          name: 'KeepB',
          component: KeepB
        }
      ]
    },
    {
      path: '/keepc',
      name: 'Keepc',
      component: KeepC,
      meta: {
        // keepAlive: false
      }
    }
  ]
})
