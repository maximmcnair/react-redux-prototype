// Dependencies
import test from 'tape'

// Component
import Card from './Card'

import React from 'react'
import TestUtils from 'react-addons-test-utils'

test('card component', (t) => {
  const shallowRenderer = TestUtils.createRenderer()
  const cardFixture = {text: 'Example'}

  // Stub the React DnD connector functions with an identity function
  var identity = function (el) { return el; }

  shallowRenderer.render(<Card.DecoratedComponent.DecoratedComponent connectDragSource={identity} connectDropTarget={identity} card={cardFixture}/>)
  const component = shallowRenderer.getRenderOutput()

  t.equal(component.props.className, 'card', 'should render an element with .card className')
  t.equal(component.props.children, 'Example', 'should render card text')

  t.end()
})
