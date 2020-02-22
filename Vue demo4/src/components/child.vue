<template>
  <div>
    chi'l'd
    <slot name="f2">
      <div></div>
    </slot>

  </div>
</template>

<script>
export default {
  as: function () {
    return {
      a: 1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
