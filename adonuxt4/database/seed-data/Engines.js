'use strict'

module.exports = [
  {
    id: 1,
    name: 'hyundai i20 1.2 petrol (84)',
    torque: [
      [1000, 57.4],
      [1500, 86.1],
      [2000, 100.5],
      [2500, 109.1],
      [3000, 114.8],
      [3500, 118.9],
      [4000, 122],
      [4500, 120.5],
      [5000, 116.2],
      [5500, 107.6],
      [6000, 98.7],
      [6500, 82],
    ],
  },
  {
    id : 2,
    name: 'clio 1.2 16v (75)',
    torque: [
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
  },
  {
    id : 3,
    name: 'peugeot 206 1.1 (60)',
    torque: [
      [1500, 82.8],
      [2000, 95.5],
      [3000, 95.5],
      [4000, 90.7],
      [4500, 87.0],
      [5000, 82.7],
      [5500, 77.4],
      [6000, 66.8],
    ],
  },
  {
    id : 4,
    name : 'fiat tipo 1.4 (95)',
    torque: [
      [1000, 58.6],
      [1500, 87.9],
      [2000, 102.6],
      [2500, 111.4],
      [3000, 117.2],
      [3500, 121.4],
      [4000, 124.6],
      [4500, 127.0],
      [5000, 125.3],
      [5500, 120.1],
      [6000, 111.4],
      [6500, 92.6],
    ],
    fueltype : 1, // petrol (diesel, hybrid, eletric)
    displacement : 1368,
    compression_ratio : 11,
    cylinders : 4, // Inline 4
  },
  {
    id : 5,
    name : 'renault clio 2 1.6 (90)',
    torque : [
      [1500, 127.3],
      [2000, 128.9],
      [2500, 131.0],
    	[3000, 124.1],
    	[4000, 131.0],
    	[4500, 130.0],
    	[5000, 128.0],
      [5500, 109.4],
    ],
    fueltype : 1,
    displacement : 1598,
    cylinders : 4,
  },
  {
    id : 6,
    name : 'ford ecoboost 1.0 (100)',
    torque : [
      [1000 , 119 ],
      [1500 , 170 ],
      [2000 , 170 ],
      [2500 , 170 ],
      [3000 , 170 ],
      [3500 , 170 ],
      [4000 , 170 ],
      [4500 , 156 ],
      [5000 , 140.4 ],
      [5500 , 127.6],
      [6000 , 117],
    ],
    fueltype : 1,
    displacement : 1000,
    cylinders : 3,
    // engineType /* Natural Aspirated, Turbo */
  },
  {
    id : 7,
    name : 'nissan micra 4 (80)',
    torque : [
      [1500,77.7],
      [2000,90.6],
      [3000,103.5],
      [4000,110.1],
      [4500,109.1],
      [5000,106.1],
      [5500,100.9],
      [6000,93.6],
    ],
    fueltype : 1,
    displacement : 1198,
    cylinders : 4,
  },
  {
    id : 8,
    name : 'trafic dci 2.0 90',
    torque : [
      [1000, 140],
      [1500, 240],
      [2000, 240],
      [2500, 240],
      [3000, 200],
      [3500, 190],
      [4000, 160],
    ]
  },
  {
    id : 9,
    name : 'hyundai tgdi 1.0 (100)',
    torque : [
      [1000, 114.7],
      [1500, 172],
      [4000, 172],
      [4500, 156],
      [5000, 140.4],
      [5500, 127.6],
      [6000, 105.3],
    ],
    displacement:998,
  },
  {
    id : 10,
    name : 'skyactiv-g (90)',
    torque : [
      [1000, 69.6],
      [1500, 104.5],
      [2000, 121.9],
      [2500, 132.3],
      [3000, 139.3],
      [3500, 144.3],
      [4000, 148],
      [4500, 140.1],
      [5000, 126.1],
      [5500, 114.6],
      [6000, 105],
      [6500, 87.3],
    ],
    displacement : 1496,
  },
  {
    id: 11,
    name : 'hyundai ioniq electric',
    torque : [
      [0, 295],
      [2800, 295],
      [3000, 280],
      [3500, 240],
      [4000, 210],
      [4500, 187],
      [5000, 168],
      [6000, 140],
      [7000, 120],
      [8000, 105],
      [9000, 93],
    ],
    fueltype : 4,
  },
  {
    id: 12,
    name : 'hyundai 1.4 (100)',
    torque : [
      [1000, 64.7],
      [1500, 97],
      [2000, 113.2],
      [2500, 122.9],
      [3000, 129.4],
      [3500, 134],
      [4000, 133.3],
      [4500, 131.3],
      [5000, 127.9],
      [5500, 123.1],
      [6000, 117],
      [6500, 97.2],
    ],
    fueltype : 1,
    displacement : 1368,
  }
]

