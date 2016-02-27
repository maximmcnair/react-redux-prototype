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
  const cardToCreate =
    { text: 'make pancakes'
    , list: '1'
    , _id: '5'
    }
  var state = BoardReducer(boardFixture, {
    type: CardTypes.NEW_CARD
  , text: cardToCreate.text
  , list: cardToCreate.list
  , id: cardToCreate._id
  })

  // Find list
  var correctList = state.lists.find(list => {
    return list._id === cardToCreate.list
  })
  var newCard = correctList.cards.find(card => {
    return card._id === cardToCreate._id
  })

  t.looseEqual(newCard, cardToCreate, 'should add new card to correct list')

  t.end()
})
