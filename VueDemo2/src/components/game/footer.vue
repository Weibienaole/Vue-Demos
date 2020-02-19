<template>
  <div class="footer-wrap">
    <div class="second">用时：{{startBoolean?time:this.$store.state.Game.time}} s</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: 0,
      timer: null,
      startBoolean: null
    }
  },
  computed: {
    listenStoreStartBoolean () {
      return this.$store.state.Game.startBoolean
    },
    listenStoreReset () {
      return this.$store.state.Game.reset
    }
  },
  watch: {
    listenStoreStartBoolean (value) {
      this.startBoolean = value
      if (value) {
        this.timer = setInterval(() => {
          this.time++
        }, 1000)
      } else {
        this.$store.state.Game.time = this.time
        setTimeout(() => {
          clearInterval(this.timer)
          if (this.$store.state.Game.win) {
            alert(
              `you win time:  ${this.$store.state.Game.time} s  step: ${this.$store.state.Game.step}`
            )
          } else {
            alert(
              `you lost time:  ${this.$store.state.Game.time} s  step: ${this.$store.state.Game.step}`
            )
          }
        }, 1500)
      }
    },
    listenStoreReset (val) {
      if (val) {
        this.time = 0
      }
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.footer-wrap {
  .second {
    float: right;
    margin-right: 40px;
    margin-top: 5px;
  }
}
</style>
