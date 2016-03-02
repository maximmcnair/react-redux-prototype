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
  io.on('connection', function(socket) {

    socket.on('msg', function(data) {
      console.log('recieve msg', data)
      io.sockets.emit('msg', {
        message: data.message
      })
    })


    socket.on('NEW_LIST', function(data) {
      console.log('recieve NEW_LIST', data)
      io.sockets.emit('NEW_LIST', {
        title: data.title
      , _id: data._id
      })
    })
    socket.on('UPDATE_LIST', function(data) {
      console.log('recieve UPDATE_LIST', data)
      io.sockets.emit('UPDATE_LIST', {
        title: data.title
      , _id: data._id
      })
    })

    socket.on('NEW_CARD', function(data) {
      console.log('recieve NEW_CARD', data)
      io.sockets.emit('NEW_CARD', {
        text: data.text
      , list: data.list
      , _id: data._id
      })
    })
    socket.on('UPDATE_CARD', function(data) {
      console.log('recieve UPDATE_CARD', data)
      io.sockets.emit('UPDATE_CARD', {
        _id: data._id
      , list: data.list
      , text: data.text
      })
    })
    socket.on('MOVE_CARD', function(data) {
      console.log('recieve MOVE_CARD', data)
      io.sockets.emit('MOVE_CARD', {
        original: data.original
      , target: data.target
      })
    })
    socket.on('DELETE_CARD', function(data) {
      console.log('recieve DELETE_CARD', data)
      io.sockets.emit('DELETE_CARD', {
        id: data.id
      , list: data.list
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
