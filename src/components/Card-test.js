// Dependencies
import test from 'tape'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'

// Component
import Card from './Card'


test('card component', (t) => {
  const cardFixture = {text: 'Example'}

  // Stub the React DnD connector functions with an identity function
  var identity = function (el) { return el; }

  const tree = sd.shallowRender(<Card.DecoratedComponent.DecoratedComponent connectDragSource={identity} connectDropTarget={identity} card={cardFixture}/>)
  // const instance = tree.getMountedInstance()
  const vdom = tree.getRenderOutput()

  // Check .card classname is rendered
  t.equal(vdom.props.className, 'card', 'should render an element with .card className')

  // Check card text if rendered
  let cardButtonText = tree.subTree('.card-text').text()
  t.equal(cardButtonText, 'Example', 'should render card text')

  t.end()
})
