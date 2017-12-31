'use strict'

const Schema = use('Schema')

class CarSchema extends Schema {
  up () {
    this.create('cars', (table) => {
      table.increments()
      table.string('name').unique()
      table.date('fromProductionDate')
      table.date('toProductionDate')

      table.json('gearRatio')
      table.decimal('gearSpeed')
      table.integer('transmission') // 1:Manual, 2:Auto .defaultTo(1)
      table.integer('traction') // 1:FWD, 2:RWD, 3:AWD

      table.integer('weight')
      table.integer('lengthmm')
      table.integer('width')
      table.integer('height')
      table.integer('wheelbase')
      table.decimal('dragCoef')
      table.decimal('dragArea')

      table.integer('trunk')
      table.integer('fuelTank')
      table.decimal('turnCircle')

      table.decimal('factoryMileageUrban')
      table.decimal('factoryMileageCountry')
      table.decimal('factoryAcc')
      table.decimal('factoryEmission')

      table.integer('engine_id').references('engines.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('cars')
  }
}

module.exports = CarSchema
