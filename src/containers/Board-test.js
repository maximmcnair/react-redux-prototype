// Dependencies
import test from 'tape'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'
import sinon from 'sinon'

// Components
import {Board, __RewireAPI__ as BoardRewireAPI, select } from './Board.js'

/* eslint-disable babel/object-shorthand */
// NOTE bable doesn't work in rewire
BoardRewireAPI.__Rewire__('List', React.createClass({
  render: function() { return <div>**test**</div>; }
}) )
/* eslint-enable babel/object-shorthand */

// Fixtures
import boardFixture from '../__fixtures__/boardFixture'

// fake document's body and html for Board component
global.document =
  { body: {scrollHeight: 100, offsetHeight: 100}
  , documentElement: {clientHeight: 100, scrollHeight: 100, offsetHeight: 100}
  }

/**
 * Board container tests
 */
test('Board container render', t => {
  // shallow render a Board container for us to test
  const tree = sd.shallowRender(<Board board={boardFixture}/>)
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // test if title is rendered
  let actualBoardHeaderTitle = tree.subTree('.board-header-title').text()
  t.equal(actualBoardHeaderTitle, 'Example project board', 'it should render board title')

  // Test if client is rendered
  let actualBoardHeaderClient = tree.subTree('.board-header-client').text()
  t.equal(actualBoardHeaderClient, 'Client name', 'it should render board client')

  // Find board-lists element
  let boardListsInnerHtml = tree.subTree('.board-lists').toString()
  // List component has been mocked by a mock component that renders `**test**`
  const amountOfTestStringsRendered = boardListsInnerHtml.match(/test/g).length
  t.equal(amountOfTestStringsRendered, 2, 'it should render board lists')

  t.end()
})

test('intial state', t => {
  // shallow render a Board container for us to test
  const tree = sd.shallowRender(<Board board={boardFixture}/>)
  const instance = tree.getMountedInstance()

  t.equal(instance.state.create, false, 'state.create should be false by default')
  t.equal(instance.state.title, '', 'state.title should be an empty string by default')

  t.end()
})

test('onNewListChange()', t => {
  // shallow render a Board container for us to test
  const tree = sd.shallowRender(<Board board={boardFixture}/>)
  const instance = tree.getMountedInstance()

  // set state.title to an empty string so we can make sure it changes
  instance.setState({title: ''})

  // create a fake event
  let fakeEvent = {currentTarget: {value: 'testing 1 2 3'}}

  // call `onNewListChange`
  instance.onNewListChange(fakeEvent)

  t.equal(instance.state.title, 'testing 1 2 3', 'should set .title to event value')

  t.end()
})

test('showNewList()', t => {
  // shallow render a Board container for us to test
  const tree = sd.shallowRender(<Board board={boardFixture}/>)
  const instance = tree.getMountedInstance()

  // set state.create to false so we can make sure it changes
  instance.setState({create: false})

  // call `showNewList`
  instance.showNewList()

  t.equal(instance.state.create, true, 'should set .create to true')
  t.end()
})

test('createNewList()', t => {
  // stub dispatch
  let stubbedDispatch = sinon.spy()
  // shallow render a Board container for us to test
  const tree = sd.shallowRender(<Board board={boardFixture} dispatch={stubbedDispatch}/>)
  const instance = tree.getMountedInstance()

  // set state.title to an example string and set create as true so we can make sure it changes
  instance.setState({title: 'example string', create: true})

  // call `.createNewList`
  instance.createNewList()

  t.equal(stubbedDispatch.callCount, 1, 'should call dispatch')

  let expectedArgs = { type: 'NEW_LIST', title: 'example string' }
  // t.looseEqual(stubbedDispatch.args[0][0], expectedArgs, 'should call dispatch with correct args')
  // NOTE can't use whole object because id is a random number (so it's very unlucky it will be right!)

  t.equal(stubbedDispatch.args[0][0].type, expectedArgs.type, 'should call dispatch with correct type')
  t.equal(stubbedDispatch.args[0][0].title, expectedArgs.title, 'should call dispatch with correct title')

  t.equal(instance.state.title, '', 'should set state.title to empty string')
  t.equal(instance.state.create, false, 'should set state.create to false')

  t.end()
})

test('newListKeydown()', t => {
  // shallow render a Board container for us to test
  const tree = sd.shallowRender(<Board board={boardFixture}/>)
  const instance = tree.getMountedInstance()

  // stub `.createNewList()`
  var stubCreateNewList = sinon.stub(instance, 'createNewList', function(){})

  // create fake invalid event
  let invalidEvent = {charCode: 0}

  // call `newListKeydown`
  instance.newListKeydown(invalidEvent)

  // should not call `.createNewList()`
  t.equal(stubCreateNewList.callCount, 0,  'should not call .createNewList() if e.charCode is not 13')

  // create a valid event
  let validEvent = {charCode: 13, preventDefault: sinon.spy()}

  // call `newListKeydown`
  instance.newListKeydown(validEvent)

  // should call `event.preventDefault()`
  t.equal(validEvent.preventDefault.callCount, 1, 'should call .preventDefault() if e.charCode is 13')

  // should call `.createNewList()`
  t.equal(stubCreateNewList.callCount, 1,  'should call .createNewList() if e.charCode is 13')

  // restore .createNewList
  instance.createNewList.restore()
  t.end()
})

test('moveCard()', t => {
  // stub dispatch
  let stubbedDispatch = sinon.spy()
  // shallow render a Board container for us to test
  const tree = sd.shallowRender(<Board board={boardFixture} dispatch={stubbedDispatch}/>)
  const instance = tree.getMountedInstance()

  let dragItem = {_id: '1', list: '2', position: 3}
  let hoverItem = {list: '1', position: 4}

  // call `.moveCard`
  instance.moveCard(dragItem, hoverItem)

  t.equal(stubbedDispatch.callCount, 1, 'should call dispatch')

  let expectedArgs =
    { type: 'MOVE_CARD'
    , originalId: '1'
    , originalList: '2'
    , originalPosition: 3
    , targetList: '1'
    , targetPosition: 4
    }
  t.looseEqual(stubbedDispatch.args[0][0], expectedArgs, 'should call dispatch with correct args')
  t.end()
})

test('updateWidth()', t => {
  // shallow render a Board container for us to test
  const tree = sd.shallowRender(<Board board={boardFixture} />)
  const instance = tree.getMountedInstance()

  t.equal(instance.updateWidth(0), 300, 'should return correct width')
  t.equal(instance.updateWidth(2), 844, 'should return correct width')
  t.end()
})

// TODO
test('getMaxHeight()')

// Find list button
// let listBtnInnerHtml = TestUtils.findRenderedDOMComponentWithClass(el, 'btn').innerHTML
// t.equal(listBtnInnerHtml, 'Create list', 'it should render new list button')

test('select()', t => {
  let state = {board: {}}
  t.looseEqual(select(state), {board: state.board}, 'should return state.board')
  t.end()
})
