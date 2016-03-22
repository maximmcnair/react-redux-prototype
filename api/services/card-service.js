var async = require('async')

require('array.prototype.find')

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
            var cardPosition
            listDocument.cards.forEach((card, i) => {
              if(card.data == cardId){
                cardPosition = card.position
                cardIndex = i
              }
            })
            // remove card from list
            listDocument.cards.splice(cardIndex, 1)

            // update positions of cards
            // find all card models to update
            var cardsToUpdate = listDocument.cards.filter((card) => {
                return card.position > cardPosition
            })
            // update original list positions
            cardsToUpdate.forEach((card) => {
              card.position = card.position - 1
            })

            // save list updates
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
  service.move = function(original, target, callback){
    // console.log(
    //   original._id
    // , original.list
    // , original.position
    // , target.data.list
    // , target.position
    // )
    // TODO this ^^ needs to be consolidated on the FE
    // (e.g. pass each value indivially into MOVE_CARD action)

    // NOTE if card is being moved in the same list we shouldn't query twice

    // TODO due to multiple db calls, we need to catch errors and revert state

    async.waterfall([
      function(asyncCallback) {
        // find OG list
        ListModel.findById(original.list, function (error, originalList) {
          if(error) return console.error('find original list ERROR', error)
          // get original card
          var originalCard
            , originalCardIndex

          originalList.cards.forEach((item, index) => {
            if(item.data == original._id){
              originalCard = item
              originalCardIndex = index
            }
          })
          // remove from original list
          originalList.cards.splice(originalCardIndex, 1)

          // update OG list positions
          // find all card models to update
          var originalListCardModels = originalList.cards.filter((card) => {
            return card.position >= original.position
          })
          // update original list positions
          originalListCardModels.forEach((card) => {
            card.position = card.position - 1
          })

          // save it
          originalList.save(function(err, document){
            if(err){
              console.error('save original list ERROR', err)
            }else{
              console.log('originalList saved', document)
              asyncCallback(null)
            }
          })
        })
      },
      function(asyncCallback) {
        // find target list
        ListModel.findById(target.data.list, function (error, targetList) {
          if(error) return console.error('find target list ERROR', error)
          // find all card models to update
          var targetListCardModels = targetList.cards.filter((card) => {
            return card.position >= target.position
          })
          // update target list positions
          targetListCardModels.forEach((card) => {
            card.position = card.position + 1
          })

          // add to target list
          targetList.cards.push({data: original._id, position: target.position})

          // save it
          targetList.save(function(err, document){
            if(err){
              console.error('save target list ERROR', err)
            }else{
              console.log('targetList saved', document)
              // asyncCallback(false, cardId, listId)
              asyncCallback(null)
            }
          })
        })
      },
      function(asyncCallback) {
        // update card
        console.log('CardModel.findById', original._id)
        CardModel.findById(original._id, function(error, cardDocument){
          if(error) return console.error('CardModel.findById ERROR', error)

          cardDocument.list = target.data.list

          // save it
          cardDocument.save(function(err, document){
            if(err){
              console.error('save card ERROR', err)
            }else{
              console.log('cardDocument saved', document)
              asyncCallback(null)
            }
          })
        })
      }
    ], function (err, result) {
      // result now equals 'done'
      callback(false, original, target)
    })
  }

  return service
}
