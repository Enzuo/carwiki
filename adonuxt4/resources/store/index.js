import Vuex from 'vuex'
import axios from '~/plugins/axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentEngine: null,
      currentCar: null,
      carBasket: [],
    },
    mutations: {
      setCurrentEngine (state, id) {
        state.currentEngine = id
      },
      setCurrentCar (state, id) {
        state.currentCar = id
      },
      addToBasket(state, car) {
        if(!state.carBasket.find((carInList) => { return carInList.id === car.id })){
          state.carBasket.push(car)
        }
      },
    },
    actions: {
      async addToBasket({commit, state}, carId){
        if(!state.carBasket.find((carInList) => { return carInList.id === carId })){
          let { data } = await axios.get(`cars/${carId}`)
          let car = data
          commit('addToBasket', car)
        }
      }
    },
    getters: {
      currentEngineUrl: (state) => {
        return state.currentEngine ? `/${state.currentEngine}` : ''
      },
      currentCarUrl: (state) => {
        return state.currentCar ? `/${state.currentCar}` : ''
      },
      basketUrl: (state) => {
        var _carIdArr = state.carBasket.map((car) => { return car.id })
        return state.carBasket ? `?cars=[${_carIdArr.toString()}]` : ''
      },
      carsInBasket: (state) => {
        return state.carBasket
      }
    }
  })
}

export default createStore
