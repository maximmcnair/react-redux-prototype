// Dependencies
import test from 'tape'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import jsdom from 'jsdom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'


// Components
import Board from '../../src/containers/Board'
import Card from '../../src/components/Card'

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
// global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
// global.window = document.parentWindow
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};

/**
 * Board container tests
 */
test('Board container rendering', (t) => {
  // mock reducer
  let mockReducer = (state, action) => {
    return state
  }
  // Create a store with mocked reducer and board fixture
  let store = createStore(mockReducer, [])
  // render board wrapper in Provider for redux store
  let el = TestUtils.renderIntoDocument(
    <Provider store={store}>
      <Board />
    </Provider>
  )
  // test if title is rendered
  let actualTitleInnerHtml = TestUtils.findRenderedDOMComponentWithClass(el, 'board-header-title').innerHTML
  t.equal(actualTitleInnerHtml, 'Fresh8 Admin', 'it should render board title')
  // Test if client is rendered
  let actualClientInnerHtml = TestUtils.findRenderedDOMComponentWithClass(el, 'board-header-client').innerHTML
  t.equal(actualClientInnerHtml, 'Connected Ventures', 'it should render board client')

  'it should render board lists'
  'it should render new list button'

  t.end()

})
