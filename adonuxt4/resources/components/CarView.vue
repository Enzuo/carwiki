<template>
  <div>
    Name : {{car.name}}
    <v-container fluid grid-list-md >
      <v-layout  rows wrap >
    <v-flex xs6 v-for="category in details" :key="category.title" >
      <v-card>
        <v-card-title>
          <h3><v-icon>{{category.icon}}</v-icon>{{category.title}}</h3>
        </v-card-title>
        <v-card-content>
          <v-data-table
            :items="category.items"
            class="elevation-1"
            hide-actions
            hide-headers
          >
            <template slot="items" scope="props">
              <td class="text-xs-left">{{ props.item.title }}</td>
              <td v-if="props.item.href" class="text-xs-right"><v-btn flat color="primary" :href="props.item.href">{{ props.item.value }}</v-btn></td>
              <td v-else class="text-xs-right">{{ props.item.value }}</td>
              <td class="text-xs-right caption">{{ props.item.unit }}</td>
            </template>
          </v-data-table>
        </v-card-content>
      </v-card>
    </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props : ['car'],
  computed : {
    details : function () {
      return [{
        title : 'size',
        icon : 'fullscreen',
        items : [
          {title:'length', value: this.car.lengthmm, unit:'mm'},
          {title:'width', value: this.car.width, unit:'mm'},
          {title:'height', value: this.car.height, unit:'mm'},
          {title:'weight', value: this.car.weight, unit:'kg'},
          {title:'wheel base', value: this.car.wheelbase, unit:'mm'},
          {title:'drag coef', value: this.car.dragCoef, unit:''},
          {title:'drag area', value: this.car.dragArea, unit:'m2'},
        ]
      },{
        title : 'performance',
        icon : 'flash_on',
        items : [
          {title:'engine', value: this.car.engine.name, href:'/engine/'+this.car.engine.id},
          {title:'acc 0-100', value: this.car.factoryAcc, unit:'s'},
        ]
      },{
        title : 'transmission',
        icon : 'settings',
        items : [
          {title:'type', value: this.car.transmission },
          {title:'traction', value: this.car.factoryAcc },
        ]
      }]
    }
  }
}
</script>
