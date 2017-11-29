import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentEngine: null
    },
    mutations: {
      setCurrentEngine (state, id) {
        state.currentEngine = id
      }
    },
    getters: {
      currentEngineUrl: (state) => {
        console.log(state.currentEngine, 'currentEngine')
        return state.currentEngine ? `/${state.currentEngine}` : ''
      }
    }
  })
}

export default createStore
