// Dependencies
import test from 'tape'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'

// Component
import List from '../../src/components/List'

/**
 * List Tests
 */
test('List component', (t) => {
  const shallowRenderer = TestUtils.createRenderer()
  const listFixture = {title: 'Backlog'}

  const tree = sd.shallowRender(<List list={listFixture}/>)

  t.equal(tree.subTree('.list-title').text(), 'Backlog', 'should render list title')
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
