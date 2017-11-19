'use strict'

class EngineController {
  index ({params}) {
    return 'my engine list'
  }

  async show ({params}) {
    return 'my engine number'+params.id
  }
}

module.exports = EngineController
