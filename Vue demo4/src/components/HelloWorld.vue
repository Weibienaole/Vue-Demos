<template>
  <div>
    vue-router
    <Child>
      <div slot="f1">Father</div>
      <div slot="f2">{{a}}</div>
      <template v-slot:default="sllot ">{{sllot}}</template>
    </Child>
    <router-link to="/Child">go CHild</router-link>
    <router-link to="/keep">go a</router-link>
    <router-link to="/keepc">go c</router-link>
  </div>
</template>

<script>
/*
      HTTP 于 HTTPS
      HTTPS 是HTTP的升级版
      更安全
      HTTPS内的数据都是经过加密处理的
      Chrome上若是HTTP的网址会显示不安全的字样，HTTPS则不会
      在搜索引擎上会优先显示HTTPS的网址

*/

/*

  一次HTTP请求过程
  1 根据你输入的网址进行DNS域名解析，找到对应的IP地址
    DNS域名解析是采用递归查询，先查找DNS缓存，找不到再去根域名服务器，再找下一级，找到了，再给浏览器
  2 根据IP地址，找对对应的服务器，进行TCP三次握手
    为什么HTTP要基于TCP实现？
      TCP是可靠的，端到端的面向连接的协议，HTTP基于数据层，TCP不用担心数据传输的各种问题（当发生错误时，会重传）
  3 建立TCP后，进行HTTP请求
  4 服务器响应HTTP请求，浏览器获取HTML代码
  5 浏览器解析HTML代码，请求代码中的资源（js、css图片）
  6 浏览器对页面进行渲染呈现给用户
    浏览器是怎么对页面进行渲染的？
      解析HTML构成DOM树
      解析CSS构成渲染树
      边解析边渲染
      JS是单线程的，JS可能修改DOM树，所以JS在执行完成前，后续资源的下载都是没有必要的，所以JS是单线程，会阻塞后续资源下载
*/
import Child from './child'
export default {
  components: {
    Child
  },
  data () {
    return {
      a: 1
    }
  },
  created () {
    let arr = [
      1,
      2,
      3,
      1,
      2,
      3,
      1,
      4,
      4,
      2,
      123,
      4332,
      1,
      2,
      3,
      123123,
      1231231,
      23,
      -1,
      -123123,
      0
    ]

    function sorts (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
          if (arr[j] > arr[j + 1]) {
            let tem = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = tem
          }
        }
      }
      return arr
    }
    console.log(sorts(arr))
  },
  methods: {
    api () {
      // zhihus()
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
