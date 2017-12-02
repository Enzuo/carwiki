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
      engines = await query.whereRaw('name_tsv @@ to_tsquery(?)', prepareTsQuery(search))
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
    return await Engine
      .query()
      .where({ id: params.id })
      .update(request.post())
      .returning(['id','name','profile'])
  }
}

module.exports = EngineController
