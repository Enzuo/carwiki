'use strict'

const Schema = use('Schema')

class CarSchema extends Schema {
  up () {
    this.create('cars', (table) => {
      table.increments()
      table.string('name').unique()
      table.specificType('name_tsv', 'tsvector')
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
      table.integer('trunkMax')
      table.integer('fuelTank')
      table.decimal('turnCircle')

      table.decimal('factoryMileageUrban')
      table.decimal('factoryMileageExtraUrban')
      table.decimal('factoryAcc')
      table.decimal('factoryEmission')
      table.decimal('factoryTopSpeed')

      table.integer('engine_id').references('engines.id')
      table.timestamps()
    })

    .raw(`
      CREATE TRIGGER cars_upd_tsvector BEFORE INSERT OR UPDATE
      ON cars
      FOR EACH ROW EXECUTE PROCEDURE name_tsv_trigger();
    `)

    this.create('car_revisions', (table) => {
      table.increments()
      table.integer('car_id').references('cars.id').notNull()
      table.integer('user_id').references('users.id').notNull()

      table.string('name')
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
      table.integer('trunkMax')
      table.integer('fuelTank')
      table.decimal('turnCircle')

      table.decimal('factoryMileageUrban')
      table.decimal('factoryMileageExtraUrban')
      table.decimal('factoryAcc')
      table.decimal('factoryEmission')
      table.decimal('factoryTopSpeed')

      table.integer('engine_id').references('engines.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('car_revisions')
    this.drop('cars')
  }
}

module.exports = CarSchema
