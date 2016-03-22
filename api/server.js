var express = require('express')
  , mongoose = require('mongoose')
  , cors = require('cors')
  , path = require('path')
  , bodyParser = require('body-parser')
  , properties = require('./properties')()

// Bootstrap db connection
var connection = mongoose.createConnection(properties.db, {})

// Once connected, set everything up
connection.once('open', function connectionOpen() {

  // Bootstrap models
  [ 'board'
  , 'list'
  , 'card'
  ].forEach(function (model) {
    require(path.join(__dirname, '/models/') + model)(connection)
  })

  var app = express()
  var server = require('http').createServer(app)
  var io = require('socket.io')(server)

  /**
   * test socket events
   */
  var ListModel = connection.model('List')
  var CardModel = connection.model('Card')

  var boardService =  require('./services/board-service')(connection)
  var listService =  require('./services/list-service')(connection)
  var cardService =  require('./services/card-service')(connection)

  io.on('connection', function(socket) {

    /**
     * RECIEVE_BOARD - Initial state
     */
    boardService.getOne('', function(error, document){
      io.to(socket.id).emit('RECIEVE_BOARD', document)
    })

    /**
     * NEW_LIST
     */
    socket.on('NEW_LIST', function(data) {
      console.log('recieve NEW_LIST', data)
      listService.create(data, function(error, document){
        io.sockets.emit('NEW_LIST', {
          title: document.title
        , _id: document._id
        })
      })
    })

    /**
     * UPDATE_LIST
     */
    socket.on('UPDATE_LIST', function(data) {
      console.log('recieve UPDATE_LIST', data)
      listService.update(data, function(error, document){
        io.sockets.emit('UPDATE_LIST', {
          title: document.title
        , _id: document._id
        })
      })
    })

    /**
     * NEW_CARD
     */
    socket.on('NEW_CARD', function(data) {
      console.log('recieve NEW_CARD', data)
      cardService.create(data, function(error, document){
        io.sockets.emit('NEW_CARD', {
          text: document.text
        , list: document.list
        , _id: document._id
        , position: document.position
        })
      })
    })

    /**
     * UPDATE_CARD
     */
    socket.on('UPDATE_CARD', function(data) {
      console.log('recieve UPDATE_CARD', data)
      cardService.update(data, function(error, document){
        io.sockets.emit('UPDATE_CARD', {
          _id: document._id
        , list: document.list
        , text: document.text
        })
      })
    })

    /**
     * MOVE_CARD
     */
    socket.on('MOVE_CARD', function(data) {
      console.log('recieve MOVE_CARD', data)
      cardService.move(data.original, data.target, function(error, cardId, listId){
        io.sockets.emit('MOVE_CARD', {
          original: data.original
        , target: data.target
        })
      })
    })

    /**
     * DELETE_CARD
     */
    socket.on('DELETE_CARD', function(data) {
      console.log('recieve DELETE_CARD', data)
      cardService.delete(data._id, data.list, function(error, cardId, listId){
        io.sockets.emit('DELETE_CARD', {
          _id: cardId
        , list: listId
        })
      })
    })

  })


  app
    .use(cors())
    // Parse HTTP bodies
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

  app.get('*', function(req, res){
    res.send('asdfasf')
  })

  server.listen(properties.port, '127.0.0.1', function() {
    console.log('Server listening on port ' + properties.port)
  })

})
