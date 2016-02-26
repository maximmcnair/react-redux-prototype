// Import styles
require('!style!css!sass!../sass/main.sass')

// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// containers
import Board from './containers/Board'
import DevTools from './containers/DevTools'

// setup redux
import configureStore from './store/configureStore'
const store = configureStore([
  { title: 'Backlog'
  , _id: '0'
  , cards:
    [ { text: 'Design homepage'
      , _id: '0'
      , list: '0'
      , position: 0
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
])

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
