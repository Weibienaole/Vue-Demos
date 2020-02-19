import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Father from '@/components/father&children/father'
import VUEXBox from '@/components/vuexBox/box1'
import Game from '@/components/game/Box'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/father',
      name: 'Father',
      component: Father
    },
    {
      path: '/vuex/Box1',
      name: 'Box1',
      component: VUEXBox
    },
    {
      path: '/Game',
      name: Game,
      component: Game
    }
  ]
})
