/**
 * Data
 */
var engines = [
    {
        name : 'hyundai i20 1.2 petrol (84)',
        torque : [
            [1000, 57.4 ],
            [1500, 86.1 ],
            [2000, 100.5 ],
            [2500, 109.1 ],
            [3000, 114.8 ],
            [3500, 118.9 ],
            [4000, 122 ],
            [4500, 120.5 ],
            [5000, 116.2 ],
            [5500, 107.6 ],
            [6000, 98.7 ],
            [6500, 82 ],
        ],
    },
    {
        name : 'clio 1.2 16v (75)',
        torque : [
            [1000, 75.9],
            [1500, 88.5],
            [2000, 87.8],
            [2500, 95.0],
            [3000, 95.0],
            [3500, 100.3],
            [4000, 106.8],
            [4500, 106.1],
            [5000, 101.6],
            [5500, 95.8],
            [6000, 83.9],
        ],
    }
]

var cars = [
    {
        name : 'hyundai i20 1.2 (84)',
        weight : 1050,
        engine : engines[0],
        gearRatio : [3.727, 2.056, 1.269, 0.906, 0.719],
        gearSpeed : 35.4,
    },
    {
        name : 'clio 4 1.2 (75)',
        weight : 1050,
        engine : engines[1],
        gearRatio : [3.702, 2.040, 1.386, 1.024, 0.79],
        gearSpeed : 32.5,
    }
]


/**
 * Options
 */
var selectedCars = []
selectedCars.push(cars[0])
selectedCars.push(cars[1])

/**
 * Compute Functions
 */
function torqueToPS(torque, rpm){
    return (torque * rpm) / (9549 * 0.7457)
}

function torqueToPSperT(torque, rpm, weight){
    return torqueToPS(torque, rpm) / (weight / 1000)
}


/**
 * Vue component
 */
Vue.component('engine-curve', {
    template: '<div>' +
              '<input type="checkbox" id="torque-checkbox" v-model="showTorque">' +
              '<label for="torque-checkbox">Torque (Nm)</label>' +
              '<input type="checkbox" id="hp-checkbox" v-model="showHP">' +
              '<label for="hp-checkbox">Horsepower (Ps)</label>' +
              '<input type="checkbox" id="hpt-checkbox" v-model="showHPperT">' +
              '<label for="hpt-checkbox">Horsepower/T (Ps)</label>' +
              '<vue-chart :columns="columns" :rows="rows" :options="options"></vue-chart>' +
              '{{options}}</div>',

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
                for(var j=0; j< selectedCars.length; j++){
                    var car = selectedCars[j]
                    var engineTick = car.engine.torque.find(function(tick){
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
                        var PSperT = torqueToPSperT(torque, i, car.weight)
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


            for(var j=0; j< selectedCars.length; j++){
                var car = selectedCars[j]
                
                if(this.showTorque){
                    columns.push({
                        type  : 'number',
                        label : car.name+' Torque',
                        lineDashStyle : [4,4],
                    })
                }

                if(this.showHP){
                    columns.push({
                        type  : 'number',
                        label : car.name+' HP',
                    })
                }

                if(this.showHPperT){
                    columns.push({
                        type  : 'number',
                        label : car.name+' HP/T',
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
                for(var i=0; i < selectedCars.length; i++){
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
})

/**
 * Vue logic
 */

Vue.use(VueCharts)
Vue.use(VueTabs)

new Vue({
    el: '#app',
    data: function () {
        return {
            columns: [{
                'type': 'number',
                'label': 'RPM'
            }, {
                'type': 'number',
                'label': 'Torque'
            }, {
                'type': 'number',
                'label': 'Expenses'
            }],
            // rows: [
            //     ['2004', 1000, 400],
            //     ['2005', 1170, 460],
            //     ['2006', 660, 1120],
            //     ['2007', 1030, 540]
            // ],
            options: {
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
                curveType: 'function'
            }
        }
    },
    computed : {
        rows : function () {
            var data = []
            for(var i=1000; i<= 7000; i+=500){
                var dataTick = [i]
                for(var j=0; j< selectedCars.length; j++){
                    var car = selectedCars[j]
                    var engineTick = car.engine.torque.find(function(tick){
                        return tick[0] === i
                    })
                    var torque = engineTick ? engineTick[1] : 0
                    var PS = torqueToPS(torque, i)
                    dataTick.push(torque)
                    // dataTick.push(PS)
                }
                data.push(dataTick)
            }
            console.log('data', data)
            return data
        }
    },
    methods:{
        handleTabChange(tabIndex, newTab, oldTab){
          console.log(tabIndex, newTab.title, oldTab.title)
        }
    },
})

