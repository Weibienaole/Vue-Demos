const box = {
  state: {
    startBoolean: false,
    step: 0,
    maxStep: 10,
    win: false,
    time: 0,
    reset: false
  },
  mutations: {
    START: state => {
      state.startBoolean = true
    },
    GOSTEP: state => {
      if (state.step === state.maxStep - 1) {
        state.startBoolean = false
      }
      state.step++
    },
    WIN: state => {
      state.win = true
      state.startBoolean = false
    },
    RESET: state => {
      state.win = false
      state.startBoolean = false
      state.step = 0
      state.time = 0
      state.reset = true
      setTimeout(() => {
        state.reset = false
      }, 1000)
    }
  },
  actions: {
    startGame: state => {
      state.commit('START')
    },
    gostep: state => {
      state.commit('GOSTEP')
    },
    getWin: state => {
      state.commit('WIN')
    },
    getReset: state => {
      state.commit('RESET')
    }
  },
  getters: {
    // timeStart: state => {
    //   console.log(123)
    //   const timer = setInterval(() => {
    //     state.time++
    //   }, 1000)
    //   if (state.startBoolean) {
    //     timer()
    //   }
    // }
  }
}
export default box
