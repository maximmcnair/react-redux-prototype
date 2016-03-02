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
  board: boardFixture
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


import superagent from 'superagent'

superagent
  .get('http://127.0.0.1:3100')
  .end((err, res) => {
    console.log(err, res)
    // if(err){
    //   cb(err)
    // }else{
    //   cb(null, res.body.results)
    // }
  })
