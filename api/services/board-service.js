module.exports = function (connection) {
  var service = {}
    , ListModel = connection.model('List')

  /**
   * Read
   */
  service.getOne = function(_id, callback){
    // NOTE this would actually query the board collection
    ListModel
      .find({})
      // .populate('cards')
      .deepPopulate('cards.card')
      .then(function(documents){
        callback(false, {
          title: 'Example project board'
        , client: 'Client name'
        , lists: documents
        })
      }, function(err){
        console.error(err)
      })
  }

  return service
}
