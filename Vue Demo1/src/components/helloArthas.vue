<template>
  <div>
    i am Arthas
    <br />
    my params is {{key + ' = ' + value}}
    my son :
    <button @click="goson('children')">son</button>
    <button @click="goson('girl')">girl</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: null,
      value: null
    }
  },
  created () {
    for (let i in this.$route.params) {
      this.key = i
      this.value = this.$route.params[i]
    }
  },
  methods: {
    goson (name) {
      this.$router.push({
        path: name
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>
