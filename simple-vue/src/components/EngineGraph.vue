<template>
    <div>
        <input type="checkbox" id="torque-checkbox" v-model="showTorque">
        <label for="torque-checkbox">Torque (Nm)</label>
        <input type="checkbox" id="hp-checkbox" v-model="showHP">
        <label for="hp-checkbox">Horsepower (Ps)</label>
        <input type="checkbox" id="hpt-checkbox" v-model="showHPperT">
        <label for="hpt-checkbox">Horsepower/T (Ps)</label>
        <vue-chart :columns="columns" :rows="rows" :options="options"></vue-chart>
        {{options}}
    </div>
</template>

<script>
import VueChart from 'vue-charts/src/components/chart'
import {torqueToPS, torqueToPSperT} from '../helpers.js'

export default {
	name : 'engine-graph',
	components : {
		VueChart,
	},
	props : {
		engines : {
			required: true,
			type: Array
		},
	},
    data: function () {
        return {
            showTorque : true,
            showHP : false,
            showHPperT : false,
        }
    },
    computed : {
        rows : function () {
            var data = []
            for(var i=1000; i<= 7000; i+=500){
                var dataTick = [i]
                for(var j=0; j< this.engines.length; j++){
                    var engine = this.engines[j]
                    var engineTick = engine.torque.find(function(tick){
                        return tick[0] === i
                    })
                    var torque = engineTick ? engineTick[1] : 0

                    if(this.showTorque){
                        dataTick.push(torque)
                    }

                    if(this.showHP){
                        var PS = torqueToPS(torque, i)
                        dataTick.push(PS)
                    }

                    if(this.showHPperT){
                        var PSperT = torqueToPSperT(torque, i, 1000)
                        dataTick.push(PSperT)
                    }
                }
                data.push(dataTick)
            }
            return data
        },
        columns : function () {
            var columns = []
            columns.push({
                type  : 'number',
                label : 'RPM'
            })


            for(var j=0; j< this.engines.length; j++){
                var engine = this.engines[j]
                
                if(this.showTorque){
                    columns.push({
                        type  : 'number',
                        label : engine.name+' Torque',
                        lineDashStyle : [4,4],
                    })
                }

                if(this.showHP){
                    columns.push({
                        type  : 'number',
                        label : engine.name+' HP',
                    })
                }

                if(this.showHPperT){
                    columns.push({
                        type  : 'number',
                        label : engine.name+' HP/T',
                    })
                }

                console.log('options', this.options)
            }

            return columns
        },
        options : function () {
            /** dashed line for torque */
            var series = {}
            if(this.showTorque){
                var nbCurvePerCar = 1 
                nbCurvePerCar += this.showHP ? 1 : 0
                nbCurvePerCar += this.showHPperT ? 1 : 0
                for(var i=0; i < this.engines.length; i++){
                    var torqueSerie = series[i*nbCurvePerCar] = {}
                    torqueSerie.lineDashStyle = [4,4]
                }
            }

            return {
                title: 'Torque Curve',
                hAxis: {
                    title: 'RPM',
                    minValue: '500',
                    maxValue: '7000'
                },
                vAxis: {
                    title: 'Torque ',
                    minValue: 0,
                    maxValue: 120
                },
                width: 900,
                height: 500,
                curveType: 'none',
                series : series,
            }
        }
    },
}
</script>