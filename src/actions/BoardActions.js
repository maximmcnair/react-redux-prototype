// Dependencies
import * as BoardTypes from './BoardTypes'

/**
 * Action creators
 */
// TODO test
export function newBoard(board){
  return {
    type: BoardTypes.RECIEVE_BOARD
  , board
  }
}
