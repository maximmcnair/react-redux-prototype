// Dependencies
import test from 'tape'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import jsdom from 'jsdom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'

// Components
import Board from './Board'

/* eslint-disable babel/object-shorthand */
// NOTE bable doesn't work in rewire
Board.__Rewire__('List', React.createClass({
  render: function() { return <div>**test**</div>; }
}))
/* eslint-enable babel/object-shorthand */


// Fixtures
import boardFixture from '../__fixtures__/boardFixture'

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = {userAgent: 'node.js'}

/**
 * Board container tests
 */
test('Board container rendering', (t) => {
  // mock reducer
  let mockReducer = (state, action) => {
    return state
  }
  // Create a store with mocked reducer and board fixture
  let store = createStore(mockReducer, {board: boardFixture})
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

  // Find board-lists element
  let boardListsInnerHtml = TestUtils.findRenderedDOMComponentWithClass(el, 'board-lists').innerHTML
  // List component has been mocked by a mock component that renders `**test**`
  const amountOfTestStringsRendered = (boardListsInnerHtml.match(/test/g) || []).length
  t.equal(amountOfTestStringsRendered, 3, 'it should render board lists')

  // Find list button
  let listBtnInnerHtml = TestUtils.findRenderedDOMComponentWithClass(el, 'btn').innerHTML
  t.equal(listBtnInnerHtml, 'Create list', 'it should render new list button')

  t.end()
})
