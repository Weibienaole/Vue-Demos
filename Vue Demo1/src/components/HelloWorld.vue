<template>
  <div>
    gelll
    <button @click="Btn">click</button>
    {{num}}
    <a href @click="e => goArthas(e, 1)">go Arthas</a>
    <!-- <router-link to=/arthas/0/>Go</router-link> -->
    <button @click="BtnTwo">nextTick: {{num2}}</button>
    <button @click="GetDom" ref="DOMBox">DOM</button>
  </div>
</template>

<script>
import { code } from '../api/1'
export default {
  data () {
    return {
      num: 0,
      num2: 0
    }
  },
  beforeCreate () {
    // console.log('brforeCreate', this.num)
  },
  watch: {
    num () {
      // console.log('watch', this.num)
    }
  },
  created () {
    // console.log('created', this.num)
    this.getList()
    this.GetDom()
  },
  mounted () {
    // console.log('mounted', this.num)
  },
  beforeMount () {
    // console.log('beforeMount', this.num)
  },
  beforeUpdate () {
    // console.log('beforeUpdate', this.num)
  },
  updated () {
    // console.log('update', this.num)
  },
  beforeDestroy () {
    // console.log('beforeDestroy')
  },
  destroyed () {
    // console.log('destroyed')
  },
  methods: {
    goArthas (e, id) {
      e.preventDefault()
      this.$router.push({
        path: `/arthas/${id}/`
      })
    },
    Btn () {
      this.num++
      console.log(this.num)
    },
    BtnTwo () {
      this.num2++
      this.$nextTick(() => {
        console.log(this.num2)
      })
    },
    getList () {
      code()
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    GetDom () {
      // 在created的方法里如果要获取DOM的话是获取不到的，所以需要用到nextTick，他会在下次渲染的时候调用，拿到DOM
      this.$nextTick(() => {
        console.log(this.$refs.DOMBox)
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>
