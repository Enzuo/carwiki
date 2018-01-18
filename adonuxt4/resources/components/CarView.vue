<template>
  <div>
    <div v-if="edit">
      <v-layout row>
        <v-flex xs3>
          <v-subheader>Name</v-subheader>
        </v-flex>
        <v-flex xs9>
          <v-text-field
            name="name"
            label="Name"
            v-model="car.name"
            single-line
          ></v-text-field>
        </v-flex>
      </v-layout>
    </div>
    <div v-else>
      Name : {{car.name}}
    </div>
    <v-container fluid grid-list-md >
      <v-layout  rows wrap >
        <v-flex md6 v-for="category in view_structure" :key="category.title" >
          <v-card>
            <v-card-title>
              <h3><v-icon>{{category.icon}}</v-icon>{{category.title}}</h3>
            </v-card-title>
            <div>
              <v-data-table
                :items="category.items"
                class="elevation-1"
                hide-actions
                hide-headers
              >
                <template slot="items" scope="props">
                  <td class="text-xs-left">{{ props.item.title }}</td>
                  <td v-if="props.item.component === 'engine'" class="text-xs-right">
                    <engine-input :engine.sync="car[props.item.value]" :edit="edit"></engine-input>
                  </td>
                  <td v-else-if="props.item.component === 'traction'" class="text-xs-right">
                    <car-types-input v-model="car[props.item.value]" :edit="edit"></car-types-input>
                  </td>
                  <td v-else-if="props.item.component === 'transmission'" class="text-xs-right">
                    <car-types-input v-model="car[props.item.value]" type="transmission" :edit="edit"></car-types-input>
                  </td>
                  <td v-else-if="edit"><input v-model="car[props.item.value]"></td>
                  <td v-else class="text-xs-right">{{ car[props.item.value] }}</td>
                  <td class="text-xs-right caption">{{ props.item.unit }}</td>
                </template>
              </v-data-table>
              <div v-for="component in category.components" :key="component">
                <car-gears v-if="component === 'gears'" :car="car" :edit="edit" :key="car.id"></car-gears>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import EngineInput from '~/components/CarViewComponents/EngineInput'
import CarTypesInput from '~/components/CarViewComponents/CarTypesInput'
import CarGears from '~/components/CarViewComponents/CarGears'

export default {
  props : {
    car : Object,
    edit : Boolean
  },
  components : {
    EngineInput,
    CarTypesInput,
    CarGears,
  },
  data : function () {
    return {
      view_structure : [{
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
      }]
    }
  }
}
</script>

<style scoped>
v-card-content .table__overflow {
  overflow: visible;
}
</style>
