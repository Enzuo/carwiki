<template>
  <div>
    <v-card-text>
      <v-layout row wrap>
        <v-flex v-for="(curve, index) of curves" v-bind:key="index" xs6>
          <v-checkbox
            :label="curve.label"
            v-model="curve.active"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-card-text>
    {{options}}
    <no-ssr>
      <vue-chart ref="graph" :columns="columns" :rows="rows" :options="options"></vue-chart>
    </no-ssr>
    <resize-observer @notify="handleWindowResize" />
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { ResizeObserver } from 'vue-resize'

import VueChart from "~/plugins/vue-charts.js";
import {
  romanize,
  torqueToPS,
  torqueToPSperT,
  getTorqueForRPM
} from "~/plugins/helpers.js";


export default {
  name: "car-power-graph",
  components: {
    VueChart,
    NoSSR,
    ResizeObserver
  },
  props: {
    cars: {
      required: true,
      type: Array
    },
    fromSpeed: {
      required: true,
      type: Number
    },
    toSpeed: {
      required: true,
      type: Number
    }
  },
  data: function() {
    return {
      showRPM : false,
      showHPperT : true,
      curves : {
        rpm : {label : 'RPM', active : false},
        hpt : {label : 'Horsepower/T', active : true},
      },
    };
  },
  computed: {
    rows: function() {
      var data = [];
      var step = Math.round((this.toSpeed - this.fromSpeed) / 10)
      step = step > 1 ? step : 1
      for (var speed = this.fromSpeed; speed <= this.toSpeed; speed += step) {
        var dataTick = [speed];
        for (var j = 0; j < this.cars.length; j++) {
          var car = this.cars[j];
          var engine = car.engine;
          var selectedGear = car.selectedGear || 4;

          var rpmForSpeed =
            speed /
            (car.gearRatio[car.gearRatio.length-1] /
              car.gearRatio[selectedGear - 1] *
              car.gearSpeed /
              1000);

          var torqueForRPM = getTorqueForRPM(car.engine.profile , rpmForSpeed);
          var PSperTForRPM = torqueToPSperT(
            torqueForRPM,
            rpmForSpeed,
            car.weight
          );
          if(this.curves.rpm.active){
            // Only push rpm if there is available torque for this number (no above redline)
            dataTick.push(torqueForRPM ? rpmForSpeed : null)
          }
          if(this.curves.hpt.active){
            dataTick.push(PSperTForRPM);
          }
        }
        data.push(dataTick);
      }
      return data;
    },
    columns: function() {
      var columns = [];
      columns.push({
        type: "number",
        label: "Speed"
      });

      for (var j = 0; j < this.cars.length; j++) {
        var car = this.cars[j];

        if(this.curves.rpm.active){
          columns.push({
            type: "number",
            label: car.name + " " + romanize(car.selectedGear)
          });
        }
        if(this.curves.hpt.active){
          columns.push({
            type: "number",
            label: car.name + " " + romanize(car.selectedGear)
          });
        }
      }

      return columns;
    },
    options: function() {
      /** dashed line for torque */
      var series = {};
      var serieIndex = 0;
      for (var j = 0; j < this.cars.length; j++) {
        var car = this.cars[j];
        if(this.curves.rpm.active){
          let serie = (series[serieIndex] = {})
          serie.color = car.color
          serie.lineDashStyle = [3, 6];
          serie.targetAxisIndex = 1
          serieIndex++
        }
        if(this.curves.hpt.active){
          let serie = (series[serieIndex] = {})
          serie.color = car.color
          serie.targetAxisIndex = 0
          serieIndex++
        }
      }

      var vAxes = {}
      if(this.curves.rpm.active){
        vAxes[1] = {
          viewWindowMode:'explicit',
          viewWindow:{
            min:750
          },
          gridlines: { color: 'transparent' },
        }
      }
      if(this.curves.hpt.active){
        vAxes[0] = {
          viewWindowMode:'explicit',
          gridlines: { color: 'transparent' },
        }
      }

      return {
        title: "RPM Curve",
        height: 500,
        curveType: "none",
        vAxes : vAxes,
        series: series,
        chartArea: { width: '90%', height: '80%'},
        legend: {
          position: 'bottom',
          textStyle: { fontSize: 11 }
        },
      };
    }
  },
  methods : {
    handleWindowResize(event) {
      let graph = this.$refs.graph
      console.log('resize',graph)
      if(graph){
        graph.$emit('redrawChart')
      }
    },
  },
};
</script>
