<template>
  <div>
    woshi a de  ars: {{ars}}
      <BB v-model="ars" @click.native="asd">
        i am aBox
        <!-- 插槽传值和具名插槽不能一起使用 -->
        <!-- 传值可以使用解构 -->
        <!-- <template v-slot:default='{Arthas}'>
          {{Arthas}}
          i am Arthas
        </template> -->
        <!-- 可以动态定义插槽名 -->
        <!-- v-slot: === #     可以简写  -->   <!-- v-slot必须携带参数才可以简写  如果使用解构会警告 -->

        <template #[names]>
          AXB
        </template>
      </BB>
      <!-- .native  可以在组件上进行事件处理 -->
      <!-- <component :is="BBs"></component> -->
      <!-- <router-link to="/keep/b">go b</router-link> -->
  </div>
</template>

<script>
/*
  关于keep-alive
    在全局添加一个keep-alive标签，可以使子组件缓存，从而导致再次进入子组件时，不会触发created和mounted，因为是拿的之前缓存的

    也可以在APP.vue中用vif判断mate中有无自己添加的字段keepAlive 从而将分开，个别缓存 详情看APP.vue

    https://www.cnblogs.com/hsBK/p/11654698.html

*/
import BB from './b'
export default {
  components: {
    BB
  },
  data () {
    return {
      BBs: BB,
      ars: '123321',
      names: 'Monica'
    }
  },
  created () {
    console.log('a')
  },
  mounted () {
    console.log('a')
  },
  methods: {
    asd () {
      console.log('click')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
