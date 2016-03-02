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

  app
    .use(cors())
    // Parse HTTP bodies
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

  app.get('*', function(req, res){
    res.send('asdfasf')
  })

  app.listen(properties.port, '127.0.0.1', function() {
    console.log('Server listening on port ' + properties.port)
  })

})
