module.exports = function(){
  var fixture =
    { title: 'Example project board'
    , client: 'Client name'
    , lists:
      [ { title: 'Backlog'
        , _id: '0'
        , cards:
          [ { text: 'Design homepage #design'
            , _id: '0'
            , list: '0'
            , position: 0
            }
          , { text: 'Design projects page #design'
            , _id: '10'
            , list: '0'
            , position: 1
            }
          ]
        }
      , { title: 'In Progress'
        , _id: '1'
        , cards:
          [ { text: 'Team permisson scoping'
            , _id: '1'
            , list: '1'
            , position: 0
            }
          , { text: 'Failed to load data (e.g. a creative that has been deleted) #bugs'
            , _id: '2'
            , list: '1'
            , position: 1
            }
          , { text: 'Creative library - slot type validation doesn\'t stop posting node then errors #bugs'
            , _id: '3'
            , list: '1'
            , position: 2
            }
          , { text: 'Build it #bugs'
            , _id: '4'
            , list: '1'
            , position: 3
            }
          ]
        }
      ]
    }

  var ListModel = connection.model('List')
  var CardModel = connection.model('Card')

  fixture.lists.forEach(list => {
    var newList = ListModel({title: list.title})
    newList.save((err, listDocument) => {
      console.log(err, listDocument)

      list.cards.forEach((card, i) => {
        var card = CardModel({
          text: card.text
        , list: listDocument._id
        , position: i
        })
        card.save((err, cardDocument) => {
          console.log(err, cardDocument)
          listDocument.cards.push(cardDocument._id)
          if(list.cards.length === i + 1){
            listDocument.save((err, listDocument) => {
              console.log(err, listDocument)
            })
          }
        })
      })
    })
  })
})
