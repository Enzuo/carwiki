

/**
 * Compute Functions
 */
function torqueToPS(torque, rpm) {
  if (torque === null || !rpm) { return null }
  return (torque * rpm) / (9549 * 0.7457)
}

function torqueToKW(torque, rpm) {
  if (torque === null || !rpm) { return null }
  return (torque * rpm) / 9549
}

function torqueToPSperT(torque, rpm, weight) {
  if (torque === null) { return null }
  return torqueToPS(torque, rpm) / (weight / 1000)
}

function PSToTorque(PS, rpm) {
  if (!PS || !rpm) return 0
  return (PS * (9549 * 0.7457)) / rpm
}
// Get Torque for any RPM
// Assuming the torqueCurve is of the form
// [[rpm, torque],[rpm, torque],...]
// (Interpolate curve)
// And ordered by rpm asc
function getTorqueForRPM(torqueCurve, rpm) {
  var torque = torqueCurve.find((torque) => {
    return torque[0] === rpm
  })
  if(torque){
    return torque[1]
  }

  var indexHigherRPM = torqueCurve.findIndex((torque) => {
    return torque[0] > rpm
  })
  // not found or first torque point was higher,
  // meaning the wanted rpm is before the torque curve if 0 or after if -1
  if (indexHigherRPM <= 0) {
    return null
  }
  var prevTorquePoint = torqueCurve[indexHigherRPM - 1]
  var nextTorquePoint = torqueCurve[indexHigherRPM]

  var distRPM = nextTorquePoint[0] - prevTorquePoint[0]
  var distPercent = (rpm - prevTorquePoint[0]) / distRPM
  var distTorque = nextTorquePoint[1] - prevTorquePoint[1]
  return prevTorquePoint[1] + distTorque * distPercent
}

// http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
function romanize(num) {
  var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }, roman = '', i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

function getTypicalRPMInterval(torque, precision) {
  var intervals = [];
  for (var i = 1; i < torque.length; i++) {
    intervals.push(torque[i][0] - torque[i - 1][0])
  }

  intervals.sort(function (a, b) { return a - b; });

  var half = Math.floor(intervals.length / 2);

  var typicalInterval = 0

  if (intervals.length % 2) {
    typicalInterval = intervals[half];
  }
  else {
    typicalInterval = (intervals[half - 1] + intervals[half]) / 2.0;
  }

  return Math.round(typicalInterval / precision) * precision
}


module.exports = {
  torqueToPS,
  torqueToKW,
  torqueToPSperT,
  PSToTorque,
  getTorqueForRPM,
  romanize,
  getTypicalRPMInterval,
}
