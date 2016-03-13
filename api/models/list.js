/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = function (connection) {
  console.log('Setting up list model')

  /**
   * List Schema
   */
  const ListSchema = new Schema(
    { title:
      { type: String
      }
    , cards:
      { type:
        [ { position:
            { type: Number
            }
          , data:
            { type: Schema.Types.ObjectId
            , ref: 'Card'
            }
          }
        ]
      , default: []
      }
    }
  )

  ListSchema.plugin(deepPopulate, {})
  connection.model('List', ListSchema)
}
