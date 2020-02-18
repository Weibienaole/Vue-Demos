import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Arthas from '@/components/helloArthas'
import ArthasChildren from '@/components/ArthasChildren'
import ArthasGirl from '@/components/ArthasGirl'
// https://www.jianshu.com/p/5dff6811252d
Vue.use(Router)
const routerList = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    // 动态路由路径参数由 : 开头
    path: '/arthas/:id/',
    name: 'Arthas',
    component: Arthas,
    children: [
      {
        path: 'children',
        name: 'ArthasChildren',
        component: ArthasChildren
      },
      {
        path: 'girl',
        name: 'ArthasGirl',
        component: ArthasGirl,
        white: true
      }
    ]
  }
]
const Routers = new Router({
  routes: routerList
})
// 路由守卫

let list = []
// 类似白名单
function whiteList (arr) {
  arr.map(i => {
    if (typeof i.children === 'undefined') {
      list.push(i)
    } else {
      whiteList(i.children)
    }
  })
}
whiteList(routerList)
list = list.filter(x => x.white)
// console.log(list, routerList)
Routers.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  // to代表将要跳转的路由，from代表将要离开的路由，结尾必须next() 不然将无法执行
  // 每次跳转路由这里都会被调用
  // 跳转时可以在这里做处理，到底跳不跳，利用白名单中的path与to的path可以通过indexOf来跳过白名单中的路由
  next()
})

export default Routers
