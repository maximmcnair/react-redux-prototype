// Import styles
require('!style!css!sass!../sass/main.sass')

// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// containers
import DevTools from './containers/DevTools'

// setup redux
import configureStore from './store/configureStore'
const store = configureStore([
  { title: 'Backlog'
  , _id: '0'
  , cards:
    [ { title: 'Design homepage'
      , _id: '0'
      , list: '0'
      , position: 0
      }
    ]
  }
, { title: 'In Progress'
  , _id: '1'
  , cards:
    [ { title: 'Team permisson scoping'
      , _id: '1'
      , list: '1'
      , position: 0
      }
    , { title: 'Failed to load data (e.g. a creative that has been deleted) #bugs'
      , _id: '2'
      , list: '1'
      , position: 1
      }
    , { title: 'Creative library - slot type validation doesn\'t stop posting node then errors #bugs'
      , _id: '3'
      , list: '1'
      , position: 2
      }
    , { title: 'Build it #bugs'
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
      <DevTools />
    </div>
  </Provider>
, document.getElementById('root'))
