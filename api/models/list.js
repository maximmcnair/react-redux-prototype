/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

module.exports = function (connection) {
  console.log('Setting up list model')

  /**
   * List Schema
   */
  var ListSchema = new Schema(
    { title:
      { type: String
      }
    , cards:
      { type:
        [ { type: Schema.Types.ObjectId
          , ref: 'Card'
          }
        ]
      }
    }
  )

  connection.model('List', ListSchema)
}
