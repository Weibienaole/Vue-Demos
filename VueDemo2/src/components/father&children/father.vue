<template>
  <div>
    i am fatherBox
    <button @click="datas">go on children</button>
    <childrenBox :datas='data' @num='childrenDatas'/>
    my children data is {{ childrenData }}
  </div>
</template>

<script>
import childrenBox from './children'
export default {
  components: {
    childrenBox
  },
  data () {
    return {
      data: 0,
      childrenData: null
    }
  },
  methods: {
    datas () {
      this.data++
    },
    childrenDatas (num) {
      this.childrenData = num
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
