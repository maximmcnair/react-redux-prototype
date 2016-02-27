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

  let state = BoardReducer(boardFixture, {
    type: CardTypes.NEW_CARD
  , text: cardToCreate.text
  , list: cardToCreate.list
  , id: cardToCreate._id
  })

  // Find list
  let correctList = state.lists.find(list => {
    return list._id === cardToCreate.list
  })
  // Find card
  let newCard = correctList.cards.find(card => {
    return card._id === cardToCreate._id
  })

  t.looseEqual(newCard, cardToCreate, 'should add new card to correct list')

  t.end()
})

test('BoardReducer handling UPDATE_CARD', t => {
  // update `Build it #bugs` card
  let state = BoardReducer(boardFixture, {
    type: CardTypes.UPDATE_CARD
  , id: '4' // these are existing fields
  , list: '1' // these are existing fields
  , text: 'Build it'
  })

  // Find list
  let correctList = state.lists.find(list => {
    return list._id === '1'
  })
  // Find card
  let card = correctList.cards.find(card => {
    return card._id === '4'
  })

  t.looseEqual(card.text, 'Build it', 'should update card\'s text')

  t.end()
})

test('BoardReducer handing DELETE_CARD', t => {
  // console.log(boardFixture.lists[1].cards.length - 1)
  // remove `Team permisson scoping` card
  let state = BoardReducer(boardFixture, {
    type: CardTypes.DELETE_CARD
  , id: '1'
  , list: '1'
  })

  // Find list
  let correctList = state.lists.find(list => {
    return list._id === '1'
  })
  // Find card
  let card = correctList.cards.find(card => {
    return card._id === '1'
  })

  // Check card has been removed
  t.equal(card, undefined, 'should delete card')
  t.equal(correctList.cards.length, boardFixture.lists[1].cards.length - 1, 'should delete card')
  // NOTE this will break if list sorting is added

  // TODO update card positions
  t.end()
})
