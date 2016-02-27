// Dependencies
import test from 'tape'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'

// Components
import List from '../../src/components/List'
import BlankComponent from '../mocks/BlankComponent'

// Mock Card component dependeny to render `testString`
const testString = '**test**'
List.__Rewire__('Card', React.createClass({
  render: function() { return <div>**test**</div>; }
}))

/**
 * List Tests
 */
test('List component', (t) => {
  const shallowRenderer = TestUtils.createRenderer()
  const listFixture =
    { title: 'Backlog'
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

  const tree = sd.shallowRender(<List list={listFixture}/>)

  t.equal(tree.subTree('.list-title').text(), 'Backlog', 'should render list title')

  const amountOfTestStringsRendered = (tree.toString().match(/test/g) || []).length
  t.equal(amountOfTestStringsRendered, 3, 'should render cards')

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
