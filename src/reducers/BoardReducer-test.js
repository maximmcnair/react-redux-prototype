// Dependencies
import test from 'tape'
import BoardReducer from './BoardReducer'
import * as CardTypes from '../actions/CardTypes'

// Fixtures
import boardFixture from '../__fixtures__/boardFixture'

/**
 * Board Reducer test
 */
test('BoardReducer initial state', t => {
  t.looseEqual(BoardReducer(undefined, {}), {}, 'should return an object')
  t.end()
})

test('BoardReducer handling NEW_CARD', t => {

  console.log(
    BoardReducer(boardFixture, {
      type: CardTypes.NEW_CARD
    })
  )

  // const newCard =
  //   { text: 'Team permisson scoping'
  //   , _id: '1'
  //   }

  t.end()
})
