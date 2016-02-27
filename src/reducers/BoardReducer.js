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
      let list = state.lists.find((list) => {
        return list._id === action.list
      })
      // push new card
      list.cards.push({text: action.text, list: action.list, _id: action.id})
      break
  }
  return state
}

export default BoardReducer
