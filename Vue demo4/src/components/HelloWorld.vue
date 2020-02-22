<template>
  <div>
    vue-router
    <Child>
      <div slot="f1">Father</div>
      <div slot="f2">{{a}}</div>
      <template v-slot:default="sllot ">{{sllot}}</template>
    </Child>
    <router-link to="/Child">go CHild</router-link>
  </div>
</template>

<script>
import Child from './child'
export default {
  components: {
    Child
  },
  data () {
    return {
      a: 1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
