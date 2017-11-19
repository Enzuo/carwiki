'use strict'

class EngineController {
  index () {
    return 'list of all engines'
  }

  show ({params}) {
    return 'engine details of engine id '+params.id
  }
}

module.exports = EngineController
