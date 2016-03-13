// Import styles
require('!style!css!sass!../sass/main.sass')

// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// containers
import Board from './containers/Board'
import DevTools from './containers/DevTools'

// Fixtures
import boardFixture from './__fixtures__/boardFixture'

// setup redux
import configureStore from './store/configureStore'
const store = configureStore({
  board: {title: 'Example project board', client: 'Client name', lists: []}
})

/**
 * Render app
 */
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Board />
    </div>
  </Provider>
, document.getElementById('root'))
// <DevTools />


// import superagent from 'superagent'
//
// superagent
//   .get('http://127.0.0.1:3100')
//   .end((err, res) => {
//     console.log(err, res)
//     // if(err){
//     //   cb(err)
//     // }else{
//     //   cb(null, res.body.results)
//     // }
//   })



const socket = require('socket.io-client')('http://127.0.0.1:3100')

import * as BoardActions from './actions/BoardActions'

socket.on('RECIEVE_BOARD', function(data){
  console.log('RECIEVE_BOARD', data)
  store.dispatch(BoardActions.newBoard(data))
})

// const randomNum = Math.floor(Math.random() * (10000000 - 0 + 1)) + 0
// console.log('i am ' + randomNum)
// socket.emit('msg', {
//   message: randomNum
// })

import * as ListActions from './actions/ListActions'

socket.on('NEW_LIST', function(data){
  store.dispatch(ListActions.newList(data.title, data._id))
})
socket.on('UPDATE_LIST', function(data){
  store.dispatch(ListActions.updateList(data.title, data._id))
})


import * as CardActions from './actions/CardActions'

socket.on('NEW_CARD', function(data){
  console.log('NEW_CARD', data)
  store.dispatch(CardActions.newCard(data.text, data.list, data._id, data.position))
})
socket.on('UPDATE_CARD', function(data){
  console.log('UPDATE_CARD', data)
  store.dispatch(CardActions.updateCard(data._id, data.list, data.text))
})
// socket.on('MOVE_CARD', function(data){
//   store.dispatch(CardActions.moveCard(data.original, data.target))
// })
socket.on('DELETE_CARD', function(data){
  console.log('DELETE_CARD', data)
  store.dispatch(CardActions.deleteCard(data._id, data.list))
})
