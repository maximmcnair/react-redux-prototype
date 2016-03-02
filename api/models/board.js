/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

module.exports = function (connection) {
  console.log('Setting up board model')

  /**
   * Board Schema
   */
  var BoardSchema = new Schema(
    { title:
      { type: String
      }
    , client:
      { type: String
      }
    , lists:
      { type:
        [ { type: Schema.Types.ObjectId
          , ref: 'List'
          }
        ]
      }
    }
  )

  connection.model('Board', BoardSchema)
}
