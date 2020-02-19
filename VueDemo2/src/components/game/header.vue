<template>
  <div class="head-wrap">
    <button v-if="!$store.state.Game.startBoolean&&!$store.state.Game.win" class="start btn" @click="startGame">Play</button>
    <button v-if="$store.state.Game.startBoolean" class="start btn" @click="startGame">Playing...</button>
    <button v-else class="start btn" @click="resetGame">Again</button>
    <div class="go btn">步数 {{ step }}</div>
    <div class="maxGo btn">最大步数 {{ $store.state.Game.maxStep }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step: 0
    }
  },
  computed: {
    steps () {
      return this.$store.state.Game.step
    }
  },
  watch: {
    steps (val) {
      this.step = val
    }
  },
  methods: {
    startGame () {
      // if (this.$store.state.Game.startBoolean) return
      this.$store.dispatch('startGame')
    },
    resetGame () {
      this.$store.dispatch('getReset')
    }
  }
}
</script>

<style lang="scss" scoped>
.head-wrap {
  height: 100px;
  display: flex;
  justify-content: space-around;
  .btn {
    border: none;
    height: 80px;
    border-radius: 12px;
    font-size: 22px;
    font-weight: bold;
  }
  .start {
    width: 200px;
    background: #597aae;
    cursor: pointer;
    color: #fff;
  }
  .go {
    width: 130px;
    background: #bbad9f;
    color: #e9e0ce;
    line-height: 80px;
  }
  .maxGo {
    width: 130px;
    background: #bbad9f;
    color: #e9e0ce;
    line-height: 80px;
  }
}
</style>
