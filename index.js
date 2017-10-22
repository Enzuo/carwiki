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
    return (torque * rpm) / 0.7457
}


/**
 * Vue logic
 */

Vue.use(VueCharts)

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
                    title: 'Torque',
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
})

