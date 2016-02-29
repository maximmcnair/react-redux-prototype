// Dependencies
import test from 'tape'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'
import sinon from 'sinon'

// Components
import {List, select} from './List'

/* eslint-disable babel/object-shorthand */
// NOTE bable doesn't work in rewire
// List.__Rewire__('Card', React.createClass({
//   render: function() { return <div>**test**</div>; }
// }))
/* eslint-enable babel/object-shorthand */

const listFixture =
  { title: 'Backlog'
  , _id: '1324'
  , cards:
    [ { text: 'a'
      , position: 0
      }
    , { text: 'c'
      , position: 2
      }
    , { text: 'b'
      , position: 1
      }
    ]
  }

/**
 * List Tests
 */
test('List component', (t) => {
  // const shallowRenderer = TestUtils.createRenderer()

  const tree = sd.shallowRender(<List list={listFixture}/>)

  // Render list title
  t.equal(tree.subTree('.list-title').text(), 'Backlog', 'should render list title')

  // Check it renders cards
  // TODO this needs to be added in again, but Rewire breaks??
  // const amountOfTestStringsRendered = (tree.toString().match(/test/g) || []).length
  // t.equal(amountOfTestStringsRendered, 3, 'should render cards')

  // Check create list button is rendered
  t.equal(tree.subTree('.btn').text(), 'Create task', 'it should render create task button')

  t.end()
})

test('List sortByPosition', (t) => {
  const cardsUnsorted =
    [ { text: 'a'
      , position: 0
      }
    , { text: 'c'
      , position: 2
      }
    , { text: 'b'
      , position: 1
      }
    ]

  const cardsExpected =
    [ { text: 'a'
      , position: 0
      }
    , { text: 'b'
      , position: 1
      }
    , { text: 'c'
      , position: 2
      }
    ]

  t.looseEqual(List.prototype.sortByPosition(cardsUnsorted), cardsExpected, 'cards should be sorted by position')
  t.end()
})

test('onNewCardChange()', t => {
  // shallow render card
  const tree = sd.shallowRender(<List list={listFixture} />)
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // create a fake event
  let fakeEvent = {currentTarget: {value: 'testing 1 2 3'}}

  t.equal(instance.state.text, '', 'state.text should start as an empty string')

  // call `onNewCardChange`
  instance.onNewCardChange(fakeEvent)

  t.equal(instance.state.text, 'testing 1 2 3', 'should set .text to event value')

  t.end()
})

test('showNewCard()', t => {
  // shallow render card
  const tree = sd.shallowRender(<List list={listFixture} />)
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // state.create should start as false
  t.equal(instance.state.create, false, 'state.create start be false')

  // call `showNewCard`
  instance.showNewCard()

  // state.create should be true
  t.equal(instance.state.create, true, 'state.create should be true')

  t.end()
})

test('newCardKeydown()', t => {
  // shallow render card
  const tree = sd.shallowRender(<List list={listFixture} />)
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // stub `.createNewCard()`
  var stubCreateNewCard = sinon.stub(instance, 'createNewCard', function(){})

  // create fake invalid event
  let invalidEvent = {charCode: 0}

  // call `newCardKeydown`
  instance.newCardKeydown(invalidEvent)

  // should not call `.createNewCard()`
  t.equal(stubCreateNewCard.callCount, 0,  'should not call .createNewCard() if e.charCode is not 13')

  // create a valid event
  let validEvent = {charCode: 13, preventDefault: sinon.spy()}

  // call `newCardKeydown`
  instance.newCardKeydown(validEvent)

  // should call `event.preventDefault()`
  t.equal(validEvent.preventDefault.callCount, 1, 'should call .preventDefault() if e.charCode is 13')

  // should call `.createNewCard()`
  t.equal(stubCreateNewCard.callCount, 1,  'should call .createNewCard() if e.charCode is 13')

  // restore .createNewCard
  instance.createNewCard.restore()

  t.end()
})

test('createNewCard()', t => {
  // stub dispatch
  let stubbedDispatch = sinon.spy()

  // shallow render card
  const tree = sd.shallowRender(
    <List
      list={listFixture}
      dispatch={stubbedDispatch}
    />
  )
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // set state to have test and create as true
  // mocking how they would be if someone was using it
  instance.setState({text: 'some example text', create: true})

  // call `.createNewCard`
  instance.createNewCard()

  t.equal(stubbedDispatch.callCount, 1, 'should call dispatch')

  let expectedArgs = { type: 'NEW_CARD', id: 1126606, list: '1324', text: 'some example text' }
  // t.looseEqual(stubbedDispatch.args[0][0], expectedArgs, 'should call dispatch with correct args')
  // NOTE can't use whole object because id is a random number (so it's very unlucky it will be right!)

  t.equal(stubbedDispatch.args[0][0].type, expectedArgs.type, 'should call dispatch with correct type')
  t.equal(stubbedDispatch.args[0][0].list, expectedArgs.list, 'should call dispatch with correct list')
  t.equal(stubbedDispatch.args[0][0].text, expectedArgs.text, 'should call dispatch with correct text')

  t.equal(instance.state.text, '', 'should set state.text to empty string')
  t.equal(instance.state.create, false, 'should set state.create to false')

  t.end()
})

test('showEditableTitle()', t => {
  // shallow render card
  const tree = sd.shallowRender(<List list={listFixture} />)
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // state.edit should start as false
  t.equal(instance.state.edit, false, 'state.edit start be false')

  // call `showEditableTitle`
  instance.showEditableTitle()

  // state.edit should be true
  t.equal(instance.state.edit, true, 'state.edit should be true')
  t.equal(instance.state.title, 'Backlog', 'state.edit should be props.list.title')

  t.end()
})

test('listTitleKeydown()', t => {
  // shallow render card
  const tree = sd.shallowRender(<List list={listFixture} />)
  const instance = tree.getMountedInstance()

  // stub `.saveListTitle()`
  var stubSaveListTitle = sinon.stub(instance, 'saveListTitle', function(){})

  // create fake invalid event
  let invalidEvent = {charCode: 0}

  // call `listTitleKeydown`
  instance.listTitleKeydown(invalidEvent)

  // should not call `.saveListTitle()`
  t.equal(stubSaveListTitle.callCount, 0,  'should not call .saveListTitle() if e.charCode is not 13')

  // create a valid event
  let validEvent = {charCode: 13, preventDefault: sinon.spy()}

  // call `listTitleKeydown`
  instance.listTitleKeydown(validEvent)

  // should call `event.preventDefault()`
  t.equal(validEvent.preventDefault.callCount, 1, 'should call .preventDefault() if e.charCode is 13')

  // should call `.saveListTitle()`
  t.equal(stubSaveListTitle.callCount, 1,  'should call .saveListTitle() if e.charCode is 13')

  // restore .saveListTitle
  instance.saveListTitle.restore()

  t.end()
})

test('onListTitleChange()', t => {
  // shallow render card
  const tree = sd.shallowRender(<List list={listFixture} />)
  const instance = tree.getMountedInstance()

  // create a fake event
  let fakeEvent = {currentTarget: {value: 'testing 1 2 3'}}

  t.equal(instance.state.title, '', 'state.title should start as an empty string')

  // call `onListTitleChange`
  instance.onListTitleChange(fakeEvent)

  t.equal(instance.state.title, 'testing 1 2 3', 'should set .title to event value')

  t.end()
})

test('saveListTitle()', t => {
  // stub dispatch
  let stubbedDispatch = sinon.spy()

  // shallow render card
  const tree = sd.shallowRender(
    <List
      list={listFixture}
      dispatch={stubbedDispatch}
    />
  )
  const instance = tree.getMountedInstance()

  // set state to have test and edit as true
  // mocking how they would be if someone was using it
  instance.setState({title: 'some example text', edit: true})

  // call `.saveListTitle`
  instance.saveListTitle()

  t.equal(stubbedDispatch.callCount, 1, 'should call dispatch')

  let expectedArgs = { type: 'UPDATE_LIST', title: 'some example text', id: '1324' }
  t.looseEqual(stubbedDispatch.args[0][0], expectedArgs, 'should call dispatch with correct args')

  t.equal(instance.state.title, '', 'should set state.title to empty string')
  t.equal(instance.state.edit, false, 'should set state.edit to false')

  t.end()

})

test('select()', t => {
  let state = {board: {}}
  t.looseEqual(select(state), {}, 'should return empty object')
  t.end()
})
