import Vuex from 'vuex'
import Vue from 'vue'
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
          // Get non alrady used color
          let color = COLORS.find( col => {
            return !state.carBasket.find((carInList) => { return carInList.color === col })
          })
          car.color = color
          state.carBasket.push(car)
        }
      },
      removeFromBasket(state, carId){
        let index = state.carBasket.findIndex((carInList) => { return carInList.id === carId })
        if(index >= 0){
          state.carBasket.splice(index, 1)
        }
      },
      changeBasketCarGear({carBasket}, {carId, gear}){
        let index = carBasket.findIndex((carInList) => { return carInList.id === carId })
        let car = carBasket[index]
        if(car){
          let maxGear = car.gearRatio ? car.gearRatio.length : 0
          let selectedGear = gear
          if(gear > maxGear){
            selectedGear = maxGear
          }
          else if(gear < 1){
            selectedGear = 1
          }
          // console.log(car, selectedGear)
          // car.selectedGear = selectedGear
          // var newVal = Object.assign({}, carBasket[index], {selectedGear: selectedGear})
          Vue.set(car, 'selectedGear', selectedGear)
          // Vue.set(carBasket, index, car)
          // console.log('index', index)
        }
      }
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
