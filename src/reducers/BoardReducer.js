// Dependencies
import Ramda from 'ramda'

// Types
import * as CardTypes from '../actions/CardTypes'

/**
 * Board Reducer
 */
const BoardReducer = (state = {}, action) => {
  // Clone state
  var state = Ramda.clone(state)

  switch (action.type) {
    case CardTypes.NEW_CARD:
      // console.log('NEW_CARD', action)
      // find list
      let list1 = state.lists.find((list) => {
        return list._id === action.list
      })
      // push new card
      list1.cards.push({text: action.text, list: action.list, _id: action.id})
      break
    case CardTypes.UPDATE_CARD:
      // console.log('UPDATE_CARD', action)
      // find list
      let list2 = state.lists.find((list) => {
        return list._id === action.list
      })
      let card2 = list2.cards.find(card => {
        return card._id === action.id
      })
      card2.text = action.text
      break
  }
  return state
}

export default BoardReducer
