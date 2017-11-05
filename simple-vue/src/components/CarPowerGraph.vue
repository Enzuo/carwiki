<template>
    <div>
        <vue-chart :columns="columns" :rows="rows" :options="options"></vue-chart>
    </div>
</template>

<script>
import VueChart from './FixedCharts.js'
import {romanize, torqueToPS, torqueToPSperT, getTorqueForRPM} from '../helpers.js'

export default {
	name : 'car-power-graph',
	components : {
		VueChart,
	},
	props : {
		cars : {
			required : true,
			type : Array
        },
        minSpeed : {
            required : true,
            type : Number
        },
        maxSpeed : {
            required : true,
            type : Number
        },
	},
    data: function () {
        return {
        }
    },
    computed : {
		curvesPerEngines : function () {
			var curvesPerEngines = []
			for(var j=0; j< this.engines.length; j++){
				var engine = this.engines[j]

				var engineCurves = []
				if(this.showTorque){
					engineCurves.push(CURVETYPES.Torque) 
				}

				if(this.showHP){
					engineCurves.push(CURVETYPES.PS)
				}

				if(this.showHPperT){
					engineCurves.push(CURVETYPES.PSperT)
				}

				curvesPerEngines.push(engineCurves)
			}
			return curvesPerEngines
		},
        rows : function () {
            var data = []
            for(var speed=this.minSpeed; speed<=this.maxSpeed; speed+=5){
                var dataTick = [speed]
                for(var j=0; j< this.cars.length; j++){
					var car = this.cars[j]
                    var engine = car.engine
                    var selectedGear = car.selectedGear || 4

                    var rpmForSpeed = speed/(car.gearRatio[4]/car.gearRatio[selectedGear-1]*car.gearSpeed/1000)
                    // dataTick.push(rpmForSpeed)

                    var torqueForRPM = getTorqueForRPM(car.engine.torque, rpmForSpeed)
                    var PSperTForRPM = torqueToPSperT(torqueForRPM, rpmForSpeed, car.weight)
                    dataTick.push(PSperTForRPM)


                }
                data.push(dataTick)
            }
            return data
        },
        columns : function () {
            var columns = []
            columns.push({
                type  : 'number',
                label : 'Speed'
            })

            for(var j=0; j< this.cars.length; j++){
                var car = this.cars[j]

                columns.push({
                    type  : 'number',
                    label : car.name+' '+romanize(car.selectedGear),
                })
			}

            return columns
        },
        options : function () {
            /** dashed line for torque */
            var series = {}
			var serieIndex = 0;
			for(var j=0; j< this.cars.length; j++){
                var car = this.cars[j]
                var serie = series[serieIndex] = {}
                serie.color = car.color
                serieIndex++;
			}

            return {
                title: 'RPM Curve',
                // hAxis: {
                //     title: 'RPM',
                //     minValue: '500',
                //     maxValue: '7000'
                // },
                // vAxis: {
                //     title: 'Torque ',
                //     minValue: 0,
                //     maxValue: 120
                // },
                width: 900,
                height: 500,
                curveType: 'none',
				series : series,
            }
        }
    },
}
</script>