<template>
    <div>
        <input type="checkbox" id="torque-checkbox" v-model="showTorque">
        <label for="torque-checkbox">Torque (Nm)</label>
        <input type="checkbox" id="hp-checkbox" v-model="showHP">
        <label for="hp-checkbox">Horsepower (Ps)</label>
        <div v-if="engines[0].carWeight">
          <input type="checkbox" id="hpt-checkbox" v-model="showHPperT">
          <label for="hpt-checkbox">Horsepower/T (Ps)</label>
        </div>
        <no-ssr>
          <vue-chart :columns="columns" :rows="rows" :options="options"></vue-chart>
        </no-ssr>
        {{ rows }} {{ columns }}
    </div>
</template>

<script>
import VueChart from "~/plugins/vue-charts.js";
import { torqueToPS, torqueToPSperT, getTorqueForRPM } from "~/../app/Helpers/helpers"
import NoSSR from 'vue-no-ssr'

const CURVETYPES = {
  Torque: 1,
  PS: 2,
  PSperT: 3
};

export default {
  name: "engine-graph",
  components: {
    VueChart,
    NoSSR
  },
  props: {
    engines: {
      required: true,
      type: Array
    }
  },
  data: function() {
    return {
      showTorque: true,
      showHP: false,
      showHPperT: false
    };
  },
  computed: {
    curvesPerEngines: function() {
      var curvesPerEngines = [];
      for (var j = 0; j < this.engines.length; j++) {
        var engine = this.engines[j];

        var engineCurves = [];
        if (this.showTorque) {
          engineCurves.push(CURVETYPES.Torque);
        }

        if (this.showHP) {
          engineCurves.push(CURVETYPES.PS);
        }

        if (this.showHPperT) {
          engineCurves.push(CURVETYPES.PSperT);
        }

        curvesPerEngines.push(engineCurves);
      }
      return curvesPerEngines;
    },
    rows: function() {
      var data = [];
      for (var i = 1000; i <= 7000; i += 500) {
        var dataTick = [i];
        for (var j = 0; j < this.curvesPerEngines.length; j++) {
          var curves = this.curvesPerEngines[j];
          var engine = this.engines[j];
          // var engineTick = engine.torque.find(function(tick){
          //     return tick[0] === i
          // })
          var torque = getTorqueForRPM(engine.profile, i);

          for (var k = 0; k < curves.length; k++) {
            switch (curves[k]) {
              case CURVETYPES.Torque:
                dataTick.push(torque);
                break;
              case CURVETYPES.PS:
                var PS = torqueToPS(torque, i);
                dataTick.push(PS);
                break;
              case CURVETYPES.PSperT:
                var PSperT = torqueToPSperT(torque, i, engine.carWeight);
                dataTick.push(PSperT);
                break;
            }
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
        label: "RPM"
      });

      for (var j = 0; j < this.curvesPerEngines.length; j++) {
        var curves = this.curvesPerEngines[j];
        var engine = this.engines[j];

        for (var k = 0; k < curves.length; k++) {
          switch (curves[k]) {
            case CURVETYPES.Torque:
              columns.push({
                type: "number",
                label: engine.name + " Torque"
              });
              break;
            case CURVETYPES.PS:
              columns.push({
                type: "number",
                label: engine.name + " HP"
              });
              break;
            case CURVETYPES.PSperT:
              columns.push({
                type: "number",
                label: engine.name + " HP/T"
              });
              break;
          }
        }
      }

      return columns;
    },
    options: function() {
      /** dashed line for torque */
      var series = {};
      var serieIndex = 0;
      for (var j = 0; j < this.curvesPerEngines.length; j++) {
        var curves = this.curvesPerEngines[j];
        var engine = this.engines[j];
        for (var k = 0; k < curves.length; k++) {
          var serie = (series[serieIndex] = {});
          switch (curves[k]) {
            case CURVETYPES.Torque:
              serie.lineDashStyle = [4, 4];
              break;
          }
          serieIndex++;
          serie.color = engine.color;
        }
      }

      return {
        title: "Torque Curve",
        hAxis: {
          title: "RPM",
          minValue: "500",
          maxValue: "7000"
        },
        vAxis: {
          title: "Torque ",
          minValue: 0,
          maxValue: 120
        },
        width: 900,
        height: 500,
        curveType: "none",
        series: series
      };
    }
  }
};
</script>
