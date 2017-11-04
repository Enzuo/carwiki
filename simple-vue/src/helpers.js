

/**
 * Compute Functions
 */
export function torqueToPS(torque, rpm){
    return (torque * rpm) / (9549 * 0.7457)
}

export function torqueToPSperT(torque, rpm, weight){
    return torqueToPS(torque, rpm) / (weight / 1000)
}


export default {
    torqueToPS,
    torqueToPSperT,
}