<template>
  <div>
    chi'l'd
    <slot name="f2">
      <div></div>
      <div @click="()=>{
          $router.push('/')
        }">childs</div>
    </slot>
  </div>
</template>

<script>
export default {
  as: function () {
    return {
      a: 1
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log(to, from)
    }
  },
  created () {
    console.log('child')
  }
}
</script>

<style lang="scss" scoped>
</style>
