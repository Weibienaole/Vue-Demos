<template>
  <div>
    传值：
    <button @click="faChilBox">父子上下传值</button>
    <button @click="Vuex">Vuex传值</button>
    <button @click="GoGame">Game</button>

    <div class="cont">
      <div class="contBefore" @click="off">前边内容</div>
      <div class="contAfter">翻转后内容</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    faChilBox () {
      this.$router.push({
        path: '/father'
      })
    },
    Vuex () {
      this.$router.push({
        path: '/vuex/Box1'
      })
    },
    GoGame () {
      this.$router.push({
        path: '/Game'
      })
    },
    off () {
      const after = document.querySelector('.contAfter')
      const before = document.querySelector('.contBefore')
      after.style.transform = 'rotateY(0deg)'
      before.style.transform = 'rotateY(180deg)'
      setTimeout(() => {
        after.style.transform = 'rotateY(180deg)'
        before.style.transform = 'rotateY(0deg)'
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.cont {
  width: 200px;
  height: 200px;
  margin: 200px auto 0;
  position: relative;
  color: #fff;
}
.cont .contBefore {
  width: 200px;
  height: 200px;
  background: #0b6aff;
  /*动画的过渡时间*/
  transition: 1s;
}
.cont .contAfter {
  width: 200px;
  height: 200px;
  background: red;
  /*1.通过定位，使背面覆盖前面*/
  position: absolute;
  top: 0;
  left: 0;
  /*2.使用rotate翻转,背面初始翻转180*/
  transform: rotateY(-180deg);
  backface-visibility: hidden;
  transition: 1s;
}
</style>
