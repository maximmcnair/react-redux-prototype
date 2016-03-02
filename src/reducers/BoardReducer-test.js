// Dependencies
import test from 'tape'
import BoardReducer from './BoardReducer'
import * as CardTypes from '../actions/CardTypes'
import * as ListTypes from '../actions/ListTypes'

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
    , position: 4 // this should be added
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

test('BoardReducer handing MOVE_CARD', t => {
  let state = BoardReducer(boardFixture, {
    type: CardTypes.MOVE_CARD
  , originalId: '0'
  , originalList: '0'
  , originalPosition: 0
  , targetList: '1'
  , targetPosition: 1
  })

  // Check card has been removed from original list
  let originalList = state.lists.find(list => {
    return list._id === '0'
  })
  let cardInOriginalList = originalList.cards.find(card => {
    return card._id === '0'
  })
  t.equal(cardInOriginalList, undefined, 'should remove card from original list')

  // check positions of originalList have been updated
  let anotherCardInOriginalList = originalList.cards.find(card => {
    return card._id === '10'
  })
  t.equal(anotherCardInOriginalList.position, 0, 'should update other cards\' positions in original list')

  // Check card has been added to target list
  let targetList = state.lists.find(list => {
    return list._id === '1'
  })
  let cardInTargetList = targetList.cards.find(card => {
    return card._id === '0'
  })
  t.equal(cardInTargetList.text, 'Design homepage #design', 'should remove card from original list')

  // Check card's list has been updated
  t.equal(cardInTargetList.list, '1', 'should have updated card\'s .list')

  // Check card's position has been updated
  t.equal(cardInTargetList.position, 1, 'should have updated card\'s .position')

  // check positions have been updated
  let anotherCardInTargetList = targetList.cards.find(card => {
    return card._id === '4'
  })
  t.equal(anotherCardInTargetList.position, 4, 'should update other cards\' positions in target list')

  t.end()
})

test('BoardReducer handing DELETE_CARD', t => {
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


test('BoardReducer handing NEW_LIST', t => {
  let state = BoardReducer(boardFixture, {
    type: ListTypes.NEW_LIST
  , title: 'kanban board'
  , id: '2'
  })

  // Find list
  let correctList = state.lists.find(list => {
    return list._id === '2'
  })

  // Check list has been added
  t.equal(correctList.title, 'kanban board', 'should add new board')

  t.end()
})

test('BoardReducer handing UPDATE_LIST', t => {
  let state = BoardReducer(boardFixture, {
    type: ListTypes.UPDATE_LIST
  , title: 'new title'
  , id: '0'
  })

  // Find list
  let correctList = state.lists.find(list => {
    return list._id === '0'
  })

  // Check list has been added
  t.equal(correctList.title, 'new title', 'should add new board')

  t.end()
})
