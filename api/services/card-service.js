module.exports = function (connection) {
  var service = {}
    , ListModel = connection.model('List')
    , CardModel = connection.model('Card')

  /**
   * Create
   */
  service.create = function(data, callback){
    ListModel.findById(data.list, function (error, listDocument) {
      var newDocument = new CardModel({
        text: data.text
      , list: data.list
      })
      newDocument.save(function(error, document) {
        if (error) {
          console.log('Error creating new card document', error)
        } else {
          // Add to list
          listDocument.cards.push({
            position: listDocument.cards.length
          , data: document._id
          })
          listDocument.save(function(error, updatedList) {
            if (error) {
              console.log('Error adding card to list', error)
            } else {
              callback(false, document)
            }
          })
        }
      })
    })
  }

  /**
   * Read
   */

  /**
   * Update
   */
  service.update = function(data, callback){
    // find the right list
    CardModel.findById(data._id, function (error, document) {
      // update text
      document.text = data.text
      document.list = data.list
      // save it
      document.save(function (error, updatedDocument) {
        if (error) {
          console.log('Error creating new list document', error)
        }else{
          callback(false, updatedDocument)
        }
      })
    })
  }

  /**
   * Delete
   */
  service.delete = function(cardId, listId, callback){
    ListModel.findById(listId, function (error, listDocument) {
      // console.log('list', listDocument)
      CardModel.findById(cardId, function (error, document) {
        // console.log('card', document)
        // Remove document
        document.remove(function(err){
          if(err){
            console.error(err)
          }else{

            // remove card reference from list
            var cardIndex
            listDocument.cards.forEach((card, i) => {
              if(card._id === cardId){
                cardIndex = i
              }
            })
            // remove card from list
            listDocument.cards.splice(cardIndex, 1)

            // TODO update positions of cards
            listDocument.save(function(err){
              if(err){
                console.error(err)
              }else{
                console.log(cardId, listId)
                callback(false, cardId, listId)
              }
            })
          }
        })
      })
    })
  }

  /**
   * Move card
   */
  service.move = function(data, callback){

  }

  return service
}
