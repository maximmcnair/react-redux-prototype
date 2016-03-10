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
  const CardSchema = new Schema(
    { text:
      { type: String
      }
    // , position:
    //   { type: Number
    //   }
    , list:
      { type: Schema.Types.ObjectId
      , ref: 'List'
      }
    }
  )

  connection.model('Card', CardSchema)
}
