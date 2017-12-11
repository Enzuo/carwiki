module.exports = [
  {
      name : 'hyundai i20 1.2 (84)',
      weight : 1050,
      engine_id : 1,
      gearRatio : [3.727, 2.056, 1.269, 0.906, 0.719],
      gearSpeed : 35.4,
  },
  {
      name : 'clio 4 1.2 (75)',
      weight : 1050,
      engine_id : 2,
      gearRatio : [3.702, 2.040, 1.386, 1.024, 0.79],
      gearSpeed : 32.5,
  },
  {
      name : 'peugeot 206 1.1 (60)',
      weight : 900,
      engine_id : 3,
      gearRatio : [3.42, 1.81, 1.28, 0.98, 0.77],
      gearSpeed : 33.3,
  },
  {
      name : 'fiat tipo 1.4 (95)',
      fromProductionDate : 2016,
      engine_id : 4,
      gearRatio : [3.9,	2.174, 1.345, 0.974, 0.766, 0.646],
      gearSpeed : 37.6,
      transmission : 1, // manual
      traction : 1, // FWD
      weight : 1195,
      lengthmm : 4368,
      width : 1792,
      height : 1495,
      wheelbase : 2638,
      dragCoef : 0.3,
      trunk : 440,
      fuelTank : 50,
      turnCircle : 10.93,
      factoryMileageUrban : 7.7,
      factoryMileageCountry : 4.5,
      factoryAcc : 12.1,
      factoryEmission : 132,
  },
  {
    // http://www.auto-selection.com/fiche-technique/renault/clio/1999/1-6i-myriade-a-60638.php
    // https://www.carfolio.com/specifications/models/car/?car=100188
    // http://www.forum-clio.com/index.php/topic,4345.20.html
    name : 'renault clio 2 RXT 1.6 (90) auto',
    fromProductionDate : 1998,
    toProductionDate : 2007,
    engine_id : 5,
    gearRatio : [3.994, 2.536, 1.581, 1],
    gearSpeed : 40, // speed IV
    transmission : 2, // auto
    weight : 980,
    lengthmm : 3773,
    width : 1640,
    height : 1417,
    wheelbase : 2472,
    dragCoef : 0.35,
    trunk : 255,
    fuelTank : 50,
    turnCircle : 10.3,
    factoryMileageUrban : 10.5,
    factoryMileageCountry : 7,
    factoryAcc : 12.9,
    factoryEmission : 184,
  }
]
