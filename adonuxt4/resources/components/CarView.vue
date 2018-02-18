<template>
  <div>
    <div v-if="cars">
      <v-card>
        <v-flex v-for="category in view_structure" :key="category.title" >
          <v-data-table
            :headers="headers"
            v-if="category.items"
            :items="category.items"
            hide-actions
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.title }}</td>
              <!-- https://github.com/vuejs/vue/issues/3479 -->
              <template v-for="(car, index) in cars">
                <td v-if="props.item.component === 'engine'" :key="car.id" class="text-xs-right">
                  <engine-input v-model="cars[index][props.item.value]"></engine-input>
                </td>
                <td v-else-if="props.item.component === 'traction'" :key="car.id" class="text-xs-right">
                  <car-types-input v-model="cars[index][props.item.value]"></car-types-input>
                </td>
                <td v-else-if="props.item.component === 'transmission'"  :key="car.id" class="text-xs-right">
                  <car-types-input v-model="cars[index][props.item.value]" type="transmission"></car-types-input>
                </td>
                <td v-else-if="props.item.computedValue" :key="car.id" class="text-xs-right">{{ _self[props.item.computedValue][index] }}</td>
                <td v-else :key="car.id" class="text-xs-right">{{ cars[index][props.item.value] }}</td>
              </template>
            </template>
          </v-data-table>
          <div v-for="component in category.components" :key="component">
            <car-eco v-if="component === 'eco'" :car="cars[0]"></car-eco>
          </div>
        </v-flex>
      </v-card>
    </div>
    <div v-else>
      <v-container fluid pa-0 grid-list-md >
        <v-layout  rows wrap >
          <v-flex md6 v-for="category in view_structure" :key="category.title" >
            <v-card v-if="!(edit && category.edit === false)">
              <v-card-title>
                <h3><v-icon>{{category.icon}}</v-icon>{{category.title}}</h3>
              </v-card-title>
              <div class="card-content">
                <v-data-table
                  v-if="category.items"
                  :items="category.items"
                  class="elevation-0"
                  hide-actions
                  hide-headers
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.title }}</td>
                    <td v-if="props.item.component === 'engine'" class="text-xs-right">
                      <engine-input v-model="car[props.item.value]" :edit="edit"></engine-input>
                    </td>
                    <td v-else-if="props.item.component === 'traction'" class="text-xs-right">
                      <car-types-input v-model="car[props.item.value]" :edit="edit"></car-types-input>
                    </td>
                    <td v-else-if="props.item.component === 'transmission'" class="text-xs-right">
                      <car-types-input v-model="car[props.item.value]" type="transmission" :edit="edit"></car-types-input>
                    </td>
                    <td v-else-if="props.item.component === 'bodytype'" class="text-xs-right">
                      <car-types-input v-model="car[props.item.value]" type="bodytype" :edit="edit"></car-types-input>
                    </td>
                    <td v-else-if="props.item.computedValue" class="text-xs-right">{{ _self[props.item.computedValue] }}</td>
                    <td v-else-if="edit"><input v-model="car[props.item.value]"></td>
                    <td v-else class="text-xs-right">{{ car[props.item.value] }}</td>
                    <td class="text-xs-right caption">{{ props.item.unit }}</td>
                  </template>
                </v-data-table>
                <div v-for="component in category.components" :key="component">
                  <car-gears v-if="component === 'gears'" :car="car" :edit="edit" :key="car.id"></car-gears>
                  <car-eco v-else-if="component === 'eco'" :car="car"></car-eco>
                </div>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import EngineInput from '~/components/CarViewComponents/EngineInput'
import CarTypesInput from '~/components/CarViewComponents/CarTypesInput'
import CarGears from '~/components/CarViewComponents/CarGears'
import CarEco from '~/components/CarEco'
import {getMaxPower, getMaxTorque} from "~/plugins/helpers.js"


export default {
  props : {
    car : Object,
    cars : Array,
    edit : Boolean
  },
  components : {
    EngineInput,
    CarTypesInput,
    CarGears,
    CarEco,
  },
  data : function () {
    return {
      view_structure : [{
          title : 'about',
          icon : 'directions_car',
          items : [
            {title:'name', value: 'name'},
            {title:'body type', value: 'bodyType', component :'bodytype'},
            {title:'segment', value: 'segment'},
            {title:'doors', value: 'doors'},
            {title:'seats', value: 'seatings'},
          ]
        },{
          title : 'size',
          icon : 'fullscreen',
          items : [
            {title:'length', value: 'lengthmm', unit:'mm'},
            {title:'width', value: 'width', unit:'mm'},
            {title:'height', value: 'height', unit:'mm'},
            {title:'weight', value: 'weight', unit:'kg'},
            {title:'wheel base', value: 'wheelbase', unit:'mm'},
            {title:'drag coef', value: 'dragCoef', unit:''},
            {title:'drag area', value: 'dragArea', unit:'m2'},
          ]
        },{
          title : 'performance',
          icon : 'flash_on',
          items : [
            {title:'engine', value: 'engine', component : 'engine' },
            {title:'acc 0-100', value: 'factoryAcc', unit:'s'},
            {title:'power', computedValue: 'maxPower'},
            {title:'torque', computedValue: 'maxTorque'},
            {title:'consumptions urban', value: 'factoryMileageUrban', unit:'l/100'},
            {title:'consumptions country', value: 'factoryMileageExtraUrban', unit:'l/100'},
            {title:'consumptions avg', computedValue: 'mpgAvg', unit:'l/100'},
            {title:'consumptions real avg', computedValue: 'mpgAvgReal', unit:'l/100'},
            {title:'CO2 Emission', value: 'factoryEmission', unit:'g/km'},
          ]
        },{
          title : 'transmission',
          icon : 'settings',
          items : [
            {title:'type', value: 'transmission', component : 'transmission' },
            {title:'traction', value: 'traction', component : 'traction' },
          ],
          components : [
            'gears'
          ]
        },{
          title : 'efficiency',
          edit : false,
          icon : 'graphic_eq',
          components : [
            'eco'
          ]
        },{
          title : 'interior details',
          edit : false,
          icon : 'fullscreen_exit',
          items : [
            {title:'trunk', value: 'trunk', unit : 'l' },
            {title:'fuel tank', value: 'fuelTank', unit : 'l' },
          ],
        }
      ]
    }
  },
  computed : {
    maxPower : function (){
      var cars = this.cars ? this.cars : [this.car]
      var maxPowers = cars.map(car => {
        var maxPower = car.engine ? getMaxPower(car.engine.profile) : { maxPower : 0, atRPM : 0}
        return `${maxPower.maxPower.toFixed(0)} hp at ${maxPower.atRPM} rpm`
      })
      return this.cars ? maxPowers : maxPowers[0]
    },
    maxTorque : function () {
      var cars = this.cars ? this.cars : [this.car]
      var maxTorques = cars.map(car => {
        var maxTorque = car.engine ? getMaxTorque(car.engine.profile) : { maxTorque : 0, atRPM : 0}
        return `${maxTorque.maxTorque.toFixed(0)} nm at ${maxTorque.atRPM} rpm`
      })
      return this.cars ? maxTorques : maxTorques[0]
    },
    mpgAvg : function () {
      var cars = this.cars ? this.cars : [this.car]
      var mpgAvgs = cars.map(car => {
        var mpgUrban = parseFloat(car.factoryMileageUrban)
        var mpgHighW = parseFloat(car.factoryMileageExtraUrban)
        var mpgAvg = mpgHighW && mpgUrban ? mpgUrban*0.35 + mpgHighW*0.65 : mpgUrban ? mpgUrban : 0
        return mpgAvg.toFixed(1)
      })
      return this.cars ? mpgAvgs : mpgAvgs[0]
    },
    mpgAvgReal : function () {
      if(this.mpgAvg instanceof Array){
        return this.mpgAvg.map(avg => {
          return (avg * 1.25).toFixed(1)
        })
      }
      return (this.mpgAvg * 1.25).toFixed(1) // 25% more compared to factory claim
    },
    headers : function () {
      var cars = this.cars ? this.cars : [this.car]
      var headers = [{
        sortable : false
      }]
      return headers.concat(cars.map(car => {
        return {
          text : car.name,
          align : 'right',
          sortable : false,
        }
      }))
    },
  }
}
</script>

<style scoped>
.card-content .table__overflow {
  overflow: visible;
}
</style>
