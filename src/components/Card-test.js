// Dependencies
import test from 'tape'
import React from 'react'
import sd from 'skin-deep'
// import ReactDOM from 'react-dom'
// import TestUtils from 'react-addons-test-utils'
// import jsdom from 'jsdom'
import sinon from 'sinon'

// Component
import {Card} from './Card'

/**
 * Card component tests
 */
test('card component', (t) => {
  const cardFixture = {text: 'Example'}

  // Stub the React DnD connector functions with an identity function
  var identity = function (el) { return el; }

  // const tree = sd.shallowRender(<Card.DecoratedComponent.DecoratedComponent connectDragSource={identity} connectDropTarget={identity} card={cardFixture}/>)
  const tree = sd.shallowRender(<Card connectDragSource={identity} connectDropTarget={identity} card={cardFixture}/>)
  // const instance = tree.getMountedInstance()
  const vdom = tree.getRenderOutput()

  // Check .card classname is rendered
  t.equal(vdom.props.className, 'card', 'should render an element with .card className')

  // Check card text if rendered
  let cardButtonText = tree.subTree('.card-text').text()
  t.equal(cardButtonText, 'Example', 'should render card text')

  t.end()
})

test('showEditableText()', t => {
  const cardFixture = {text: 'Example'}
  // Stub the React DnD connector functions with an identity function
  var identity = function (el) { return el; }

  // shallow render card
  const tree = sd.shallowRender(<Card connectDragSource={identity} connectDropTarget={identity} card={cardFixture}/>)
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // state.edit should start as false
  t.equal(instance.state.edit, false, 'state.edit start be false')

  // call `showEditableText`
  instance.showEditableText()

  // state.edit should be true
  t.equal(instance.state.edit, true, 'state.edit should be true')
  t.equal(instance.state.text, 'Example', 'state.text should equal props.text')

  t.end()
})

test('cardTextKeydown()', t => {
  const cardFixture = {text: 'Example'}
  // Stub the React DnD connector functions with an identity function
  var identity = function (el) { return el; }

  // shallow render card
  const tree = sd.shallowRender(<Card connectDragSource={identity} connectDropTarget={identity} card={cardFixture}/>)
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // stub `.saveCardText()`
  var stubSaveCardText = sinon.stub(instance, 'saveCardText', function(){})

  // create fake invalid event
  let invalidEvent = {charCode: 0}

  // call `cardTextKeydown`
  instance.cardTextKeydown(invalidEvent)

  // should not call `.saveCardText()`
  t.equal(stubSaveCardText.callCount, 0,  'should not call .saveCardText() if e.charCode is not 13')

  // create a valid event
  let validEvent = {charCode: 13, preventDefault: sinon.spy()}

  // call `cardTextKeydown`
  instance.cardTextKeydown(validEvent)

  // should call `event.preventDefault()`
  t.equal(validEvent.preventDefault.callCount, 1, 'should call .preventDefault() if e.charCode is 13')

  // should call `.saveCardText()`
  t.equal(stubSaveCardText.callCount, 1,  'should call .saveCardText() if e.charCode is 13')

  // restore .saveCardText
  instance.saveCardText.restore()

  t.end()
})

test('onCardTextChange()', t => {
  const cardFixture = {text: 'Example'}
  // Stub the React DnD connector functions with an identity function
  var identity = function (el) { return el; }

  // shallow render card
  const tree = sd.shallowRender(<Card connectDragSource={identity} connectDropTarget={identity} card={cardFixture}/>)
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // create a fake event
  let fakeEvent = {currentTarget: {value: 'testing 1 2 3'}}

  t.equal(instance.state.text, '', 'state.text should start as an empty string')

  // call `onCardTextChange`
  instance.onCardTextChange(fakeEvent)

  t.equal(instance.state.text, 'testing 1 2 3', 'should set .text to event value')

  t.end()
})

test('saveCardText()', t => {
  const cardFixture = {text: 'Example', _id: '13', list: '1234'}
  // Stub the React DnD connector functions with an identity function
  var identity = function (el) { return el; }

  // stub dispatch
  let stubbedDispatch = sinon.spy()

  // shallow render card
  const tree = sd.shallowRender(
    <Card
      connectDragSource={identity}
      connectDropTarget={identity}
      card={cardFixture}
      dispatch={stubbedDispatch}
    />
  )
  const instance = tree.getMountedInstance()
  // const vdom = tree.getRenderOutput()

  // set state to have test and edit as true
  // mocking how they would be if someone was using it
  instance.setState({text: 'some example text', edit: true})

  // call `.saveCardText`
  instance.saveCardText()

  t.equal(stubbedDispatch.callCount, 1, 'should call dispatch')

  let expectedArgs = { type: 'UPDATE_CARD', id: '13', list: '1234', text: 'some example text' }
  t.looseEqual(stubbedDispatch.args[0][0], expectedArgs, 'should call dispatch with correct args')

  t.equal(instance.state.text, '', 'should set state.text to empty string')
  t.equal(instance.state.edit, false, 'should set state.edit to false')

  t.end()
})


test('deleteCard()', t => {
  const cardFixture = {text: 'Example', _id: '13', list: '1234'}
  // Stub the React DnD connector functions with an identity function
  var identity = function (el) { return el; }

  // stub dispatch
  let stubbedDispatch = sinon.spy()

  // shallow render card
  const tree = sd.shallowRender(
    <Card
      connectDragSource={identity}
      connectDropTarget={identity}
      card={cardFixture}
      dispatch={stubbedDispatch}
    />
  )
  const instance = tree.getMountedInstance()

  // call `.deleteCard`
  instance.deleteCard()

  t.equal(stubbedDispatch.callCount, 1, 'should call dispatch')

  let expectedArgs = { type: 'DELETE_CARD', id: '13', list: '1234'}
  t.looseEqual(stubbedDispatch.args[0][0], expectedArgs, 'should call dispatch with correct args')

  t.end()
})
