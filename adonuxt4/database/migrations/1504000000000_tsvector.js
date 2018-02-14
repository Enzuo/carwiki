'use strict'

const Schema = use('Schema')

class TsVector extends Schema {
  async up () {
    this.raw(`
      DROP FUNCTION IF EXISTS name_tsv_trigger();
      CREATE FUNCTION name_tsv_trigger() RETURNS trigger AS $$
      begin
        new.name_tsv = to_tsvector('english', COALESCE(new.name,''));
        return new;
      end
      $$ LANGUAGE plpgsql;
    `)
  }

  down () {

  }
}

module.exports = TsVector
