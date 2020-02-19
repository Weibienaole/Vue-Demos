<template>
  <div class="gameBox-wrap">
    <div class="gamebox">
      <HeaderBox/>
      <GameContainer/>
      <FooterBox/>
    </div>
  </div>
</template>

<script>
import HeaderBox from './header'
import GameContainer from './gameCon'
import FooterBox from './footer'
export default {
  components: {
    HeaderBox,
    GameContainer,
    FooterBox
  }
}
</script>

<style lang="scss" scoped>
.gameBox-wrap {
  width: 100%;
  height: 600px;
  margin: 20px 0;
  .gamebox {
    height: 100%;
    width: 600px;
    margin: 0 auto;
    background: #f9f7ee;
  }
}
</style>
