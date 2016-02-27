// Dependencies
import * as ListTypes from './ListTypes'

/**
 * Action creators
 */
export function newList(title, id){
  return {
    type: ListTypes.NEW_LIST
  , title
  , id
  }
}
