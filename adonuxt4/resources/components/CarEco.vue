<template>
  <div>
    <h3>Rendement</h3>
    <v-text-field
      :value="speed" @change="v => speed = v ? parseInt(v) : 0"
      label="Speed (km/h)"
    ></v-text-field>
    Minimal Power needed for speed : {{ minPowerNeededForSpeed }}
    <div v-for="gear in throttlePerGear" :key="gear.gearNumber">
      {{gear.gearNumber}} - RPM : {{gear.rpm}} - % Throttle : {{gear.throttle*100}}
    </div>
    <img src="http://cdn2.blogautomobile.fr/wp-content/uploads/2010/09/rendement-du-moteur-thermique-4.jpg"/>
  </div>
</template>

<script>
import {
  torqueToPS,
  romanize,
  getTorqueForRPM
} from "~/plugins/helpers.js";

  export default {
    props : ['car'],
    data : function () {
      return {
        speed : 90
      }
    },
    computed : {
      minPowerNeededForSpeed : function () {
        // Surface frontal * coef air penetration
        var S = this.car.dragArea || 2.20
        var Cx = this.car.dragCoef || 0.33
        var SCx = S * Cx
        //
        var speed = this.speed / 3.6
        var weight = this.car.weight || 1000
        var gravity = 10
        var coefWheelDrag = 0.25
        // masse volumique air
        var rho = 1.2
        var wheelDrag = weight * coefWheelDrag * speed
        var airDrag = 0.5 * rho * SCx * Math.pow(speed, 3)

        console.log('weight', weight, 'speed', speed, 'airDrag',airDrag, 'wheelDrag',wheelDrag)

        return (airDrag + wheelDrag)/ 735 // metric horsepower (ps)
      },
      throttlePerGear : function () {
        var gears = []
        var car = this.car
        var speed = this.speed
        if(!car.engine){
          return gears
        }
        for(var i=0; i<car.gearRatio.length; i++){
          // TODO : create helper function to get rpm for speed
          var rpmForSpeed =
            speed /
            (car.gearRatio[car.gearRatio.length-1] /
              car.gearRatio[i] *
              car.gearSpeed /
              1000);

          var torqueForRpm = getTorqueForRPM(car.engine.profile, rpmForSpeed)
          if(!torqueForRpm){
            continue
          }
          var ps = torqueToPS(torqueForRpm, rpmForSpeed)
          var throttle = this.minPowerNeededForSpeed/ps
          gears.push({gearNumber : romanize(i+1), throttle, rpm : rpmForSpeed})
        }
        return gears
      }
    }
  }
</script>
