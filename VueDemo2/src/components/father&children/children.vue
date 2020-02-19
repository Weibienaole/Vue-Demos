<template>
  <div>
    i am childrenBox
    <br>
    mt father's data {{ datas }}

  <br>
  i want from father data
  <button @click="fatherData">go on father</button>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array
    }
  },
  data () {
    return {
      nums: 1111
    }
  },
  methods: {
    fatherData () {
      this.nums += 10
      this.$emit('num', this.nums)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
