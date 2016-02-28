// Dependencies
import test from 'tape'
import * as ListTypes from './ListTypes'
import * as ListActions from './ListActions'

/**
 * Card Actions test
 */
test('ListActions.newList()', (t) => {
  const text = 'In Progress'
  const id = '5'
  t.equal(ListActions.newCard(text).type, ListTypes.NEW_LIST, 'should have type NEW_CARD')
  t.equal(ListActions.newCard(title, id).title, title, 'should have correct title')
  t.equal(ListActions.newCard(title, id).id, id, 'should have correct id')
  t.end()
})
