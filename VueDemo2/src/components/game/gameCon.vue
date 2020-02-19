<template>
  <div class="gameContainer-wrap">
    <div class="box">
      <ul>
        <li v-for="(item, index) in boxArr" :key="index" class="cards">
          <div class="cardBefore" @click="clickCards(index, item)">前边内容</div>
          <div class="cardAfter">{{item}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      boxArr: null,
      numArr: [],
      checkDotArr: [],
      successArr: 0
    }
  },
  computed: {
    listenStoreReset () {
      return this.$store.state.Game.reset
    }
  },
  watch: {
    listenStoreReset (val) {
      if (val) {
        const dots = document.querySelectorAll('.cards')

        for (let i of dots) {
          i.children[0].style.transform = 'rotateY(0deg)'
          i.children[1].style.transform = 'rotateY(180deg)'
        }
        this.successArr = 0
      }
    }
  },
  created () {
    this.initCards()
  },
  methods: {
    clickCards (index, item) {
      console.log(this.$store.state.Game.startBoolean)
      if (!this.$store.state.Game.startBoolean) return
      if (this.numArr.length === 2) return
      this.$store.dispatch('gostep')
      this.numArr.push(item)
      const dots = document.querySelectorAll('.cards')[index].children
      dots[0].style.transform = 'rotateY(180deg)'
      dots[1].style.transform = 'rotateY(0deg)'
      if (this.numArr.length === 1) {
        this.checkDotArr.push(dots)
      } else if (this.numArr[0] === this.numArr[1]) {
        this.numArr = []
        this.checkDotArr = []
        this.successArr++
        if (this.successArr === 8) {
          this.$store.dispatch('getWin')
        }
      } else {
        this.checkDotArr.push(dots)
        this.backCards()
      }
    },
    backCards () {
      setTimeout(() => {
        for (let i of this.checkDotArr) {
          i[0].style.transform = 'rotateY(0deg)'
          i[1].style.transform = 'rotateY(180deg)'
          this.numArr.shift()
        }
      }, 1500)
    },
    initCards () {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8]
      this.boxArr = [...arr, ...arr]
    }
  }
}
</script>

<style lang="scss" scoped>
.gameContainer-wrap {
  width: 95%;
  margin: 0 auto;
  background: #fff;
  height: 465px;
  .box {
    height: 100%;
    ul {
      overflow: hidden;
      height: 100%;
      .cards {
        float: left;
        width: 23%;
        height: 23%;
        // border: 1px solid;
        margin: 4px 5.3px;
        font-size: 25px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        .cardBefore {
          width: 100%;
          height: 100%;
          background: #0b6aff;
          /*动画的过渡时间*/
          transition: 1s;
          border-radius: 8px;
        }
        .cardAfter {
          width: 100%;
          height: 100%;
          background: red;
          /*1.通过定位，使背面覆盖前面*/
          position: absolute;
          top: 0;
          left: 0;
          /*2.使用rotate翻转,背面初始翻转180*/
          transform: rotateY(-180deg);
          backface-visibility: hidden;
          transition: 1s;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
