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
        let length = state.carBasket.length

        if(!state.carBasket.find((carInList) => { return carInList.id === car.id })){
          car.color = COLORS[length]
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

const COLORS = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC',
]

export default createStore
