// Dependencies
import test from 'tape'
import sinon from 'sinon'

import cardSource from './cardSource'

/**
 * cardSource test
 */
test('beginDrag()', t => {
  var props =
    { card:
      { _id: '1234'
      , position: 1
      , list: '1'
      }
    , index: 0
    }

  let expected = {
    _id: '1234'
  , position: 1
  , index: 0
  , list: '1'
  }

  t.looseEqual(cardSource.beginDrag(props), expected, 'should return correct data')

  t.end()
})
