'use strict'

const Schema = use('Schema')

class CarSchema extends Schema {
  up () {
    this.create('cars', (table) => {
      table.increments()
      table.string('name').unique()
      table.json('gearRatio')
      table.decimal('gearSpeed')
      table.integer('weight')
      table.integer('length')
      table.integer('width')
      table.integer('height')
      table.integer('engine_id').references('engines.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('cars')
  }
}

module.exports = CarSchema
