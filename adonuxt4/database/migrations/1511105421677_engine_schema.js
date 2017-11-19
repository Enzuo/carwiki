'use strict'

const Schema = use('Schema')

class EngineSchema extends Schema {
  up () {
    this.create('engines', (table) => {
      table.increments()
      table.string('name',80)
      table.json('profile')
      table.timestamps()
    })
  }

  down () {
    this.drop('engines')
  }
}

module.exports = EngineSchema
