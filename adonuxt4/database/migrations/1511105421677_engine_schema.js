'use strict'

const Schema = use('Schema')

class EngineSchema extends Schema {
  async up () {

    this.create('engines', (table) => {
      table.increments()
      table.string('name').unique()
      table.specificType('name_tsv', 'tsvector')
      table.date('fromProductionDate')
      table.date('toProductionDate')

      table.json('profile')
      table.decimal('gearSpeed')
      table.integer('fueltype')
      table.integer('displacement')
      table.integer('cylinders')
      table.integer('compression_ratio')
      table.timestamps()
    })

    //https://www.compose.com/articles/indexing-for-full-text-search-in-postgresql/
    .raw(`
      CREATE TRIGGER engines_upd_tsvector BEFORE INSERT OR UPDATE
      ON engines
      FOR EACH ROW EXECUTE PROCEDURE name_tsv_trigger();
    `)
    //https://github.com/tgriesser/knex/issues/203
    // https://forum.adonisjs.com/t/raw-sql-query-not-working-for-migrations/446/4
    // await this.raw('CREATE INDEX name_idx ON engines USING gist(to_tsvector(name))')
  }

  down () {
    this.drop('engines')
  }
}

module.exports = EngineSchema
