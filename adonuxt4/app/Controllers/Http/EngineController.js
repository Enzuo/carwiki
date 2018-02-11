'use strict'

const Engine = use('App/Models/Engine')
const {prepareTsQuery} = use('App/Helpers/sql')


class EngineController {
  async index ({request}) {
    let search = request.input('search')
    let engines = []
    let query = Engine.query()
      .select('id', 'name')
      .limit(5).clone()
    if(search){
      var tsQuery = prepareTsQuery(search)
      engines = await query.whereRaw('name_tsv @@ to_tsquery(?)', tsQuery)
        .orderByRaw('ts_rank(name_tsv, to_tsquery(?)) DESC', tsQuery)
    }
    else{
      engines = await query
    }
    return engines
  }

  async show ({params}) {
    let id = params.id
    let engine = await Engine.find(id)
    if(!engine){
      throw Error('no such engine')
    }
    return engine
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'profile'])
    const engine = await Engine.findOrFail(params.id)
    engine.merge(data)
    await engine.save()
    return engine.toJSON()
  }

  async store ({ params, request }) {
    const data = request.only(['name', 'profile'])
    const engine = await Engine.create(data)
    return engine.toJSON()
  }
}

module.exports = EngineController
