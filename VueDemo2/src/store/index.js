import Vue from 'vue'
import Vuex from 'vuex'
import Game from './model/game'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    Game
  }
})
export default store
