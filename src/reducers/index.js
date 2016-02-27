// Dependencies
import { combineReducers } from 'redux'

// Reducers
import board from './BoardReducer'

/**
 * Root Reducer
 */
const RootReducer = combineReducers({
  board
})

export default RootReducer
