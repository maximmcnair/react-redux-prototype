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
// TODO remove this
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
      <DevTools />
    </div>
  </Provider>
, document.getElementById('root'))
