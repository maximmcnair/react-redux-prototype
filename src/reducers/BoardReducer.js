// Dependencies
import * as CardTypes from '../actions/CardTypes'

/**
 * Board Reducer
 */
const BoardReducer = (state = {}, action) => {
  switch (action.type) {
    case CardTypes.NEW_CARD:
      console.log('NEW_CARD')
      break;
    default:
      return state
  }
}

export default BoardReducer
