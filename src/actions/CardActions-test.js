// Dependencies
import test from 'tape'
import * as CardTypes from './CardTypes'
import * as CardActions from './CardActions'

/**
 * Card Actions test
 */
test('CardActions.newCard()', (t) => {
  const text = 'make pancakes'
  const list = '0'
  const id = '5'
  t.equal(CardActions.newCard(text).type, CardTypes.NEW_CARD, 'should have type NEW_CARD')
  t.equal(CardActions.newCard(text, list, id).text, text, 'should have correct text')
  t.equal(CardActions.newCard(text, list, id).list, list, 'should have correct list')
  t.equal(CardActions.newCard(text, list, id).id, id, 'should have correct id')
  t.end()
})

test('CardActions.updateCard()', (t) => {
  const id = '012'
  const list = '0'
  const text = 'make pancakes'
  t.equal(CardActions.updateCard(id, text).type, CardTypes.UPDATE_CARD, 'should have type UPDATE_CARD')
  t.equal(CardActions.updateCard(id, list, text).id, id, 'should have correct id')
  t.equal(CardActions.updateCard(id, list, text).list, list, 'should have correct list')
  t.equal(CardActions.updateCard(id, list, text).text, text, 'should have correct text')
  t.end()
})

test('CardActions.moveCard()', (t) => {
  const original = {_id: '0123', list: '0', position: '3'}
  const target = {_id: '31234', list: '1', position: '5'}
  t.equal(CardActions.moveCard(original, target).type, CardTypes.MOVE_CARD, 'should have type MOVE_CARD')
  t.equal(CardActions.moveCard(original, target).originalId, original._id, 'should have correct originalId')
  t.equal(CardActions.moveCard(original, target).originalList, original.list, 'should have correct originalList')
  t.equal(CardActions.moveCard(original, target).originalPosition, original.position, 'should have correct originalPosition')
  t.equal(CardActions.moveCard(original, target).targetList, target.list, 'should have correct targetList')
  t.equal(CardActions.moveCard(original, target).targetPosition, target.position, 'should have correct targetPosition')
  t.end()
})

test('CardActions.deleteCard()', (t) => {
  const id = '012'
  const list = '012'
  t.equal(CardActions.deleteCard(id, list).type, CardTypes.DELETE_CARD, 'should have type DELETE_CARD')
  t.equal(CardActions.deleteCard(id, list).id, id, 'should have correct id')
  t.equal(CardActions.deleteCard(id, list).id, list, 'should have correct list')
  t.end()
})
