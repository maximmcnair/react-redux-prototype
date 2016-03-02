/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

module.exports = function (connection) {
  console.log('Setting up card model')

  /**
   * Card Schema
   */
  var CardSchema = new Schema(
    { text:
      { type: String
      }
    , position:
      { type: Number
      }
    }
  )

  connection.model('Card', CardSchema)
}
