<template>
  <div>
    i am box2
    <button @click="sub(3)">-</button>
    {{ storeNum }}
    <button @click="add(1)">+</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      // num: null
    }
  },
  computed: {
    ...mapState({
      storeNum: state => state.box.num
    })
  },
  methods: {
    sub (num) {
      this.$store.dispatch('subnum', num)
    },
    add (num) {
      this.$store.dispatch('addnum', num)
    },
    ...mapGetters([
      'asd'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
