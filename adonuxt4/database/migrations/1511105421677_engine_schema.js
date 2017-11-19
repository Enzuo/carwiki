'use strict'

const Schema = use('Schema')

class EngineSchema extends Schema {
  async up () {
    await this
    // .create('engines', (table) => {
    //   table.increments()
    //   table.string('name',80)
    //   table.specificType('name_tsv', 'tsvector')
    //   // table.index('name', 'name_idx', 'gist(to_tsvector)')
    //   table.json('profile')
    //   table.timestamps()
    // })
    //https://www.compose.com/articles/indexing-for-full-text-search-in-postgresql/
    .raw(`
      CREATE TABLE engines(
         id INTEGER PRIMARY KEY NOT NULL
        ,name VARCHAR(80) NOT NULL
        ,name_tsv tsvector
        ,profile json
        ,created_at TIMESTAMP DEFAULT NOW()
        ,updated_at TIMESTAMP
      );

      DROP FUNCTION IF EXISTS name_tsv_trigger();
      CREATE FUNCTION name_tsv_trigger() RETURNS trigger AS $$
      begin
        new.name_tsv = to_tsvector('english', COALESCE(new.name,''));
        return new;
      end
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE FUNCTION updated_at_trigger()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = now();
          RETURN NEW;
      END;
      $$ language 'plpgsql';

      CREATE TRIGGER engines_upd_tsvector BEFORE INSERT OR UPDATE
      ON engines
      FOR EACH ROW EXECUTE PROCEDURE name_tsv_trigger();

      CREATE TRIGGER engines_upd_at BEFORE UPDATE
      ON engines
      FOR EACH ROW EXECUTE PROCEDURE  updated_at_trigger();
    `)
    //https://github.com/tgriesser/knex/issues/203
    // await this.raw('CREATE INDEX name_idx ON engines USING gist(to_tsvector(name))')
  }

  down () {
    this.drop('engines')
  }
}

module.exports = EngineSchema
