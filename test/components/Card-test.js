// Dependencies
import test from 'tape'

// Component
import Card from '../../src/components/Card'

import React from 'react'
import TestUtils from 'react-addons-test-utils'

test('card component', (t) => {
  const shallowRenderer = TestUtils.createRenderer()
  const cardFixture = {text: 'Example'}

  shallowRenderer.render(<Card card={cardFixture}/>)
  const component = shallowRenderer.getRenderOutput()

  t.equal(component.props.className, 'card', 'should render an element with .card className')
  t.equal(component.props.children, 'Example', 'should render card text')

  t.end()
})
