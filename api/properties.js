var _ = require('lodash')

var baseProperties =
    { port: 3100
    , root: __dirname
    , session:
      { secret: '123412345678sfgh!'
      }
    }

  , properties =
    { development:
      { port: 3100
      , db: 'mongodb://localhost/kanban-test'
      }
    }

module.exports = function () {
  var env = process.env.NODE_ENV || 'development'
  return _.extend({ environment: env }, baseProperties, properties[env])
}
