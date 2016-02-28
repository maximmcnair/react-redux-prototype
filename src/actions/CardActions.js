// Dependencies
import * as CardTypes from './CardTypes'

/**
 * Action creators
 */
export function newCard(text, list, id){
  return {
    type: CardTypes.NEW_CARD
  , text
  , list
  , id
  }
}
export function updateCard(id, list, text){
  return {
    type: CardTypes.UPDATE_CARD
  , id
  , list
  , text
  }
}
export function moveCard(original, target){
  return {
    type: CardTypes.MOVE_CARD
  , originalId: original._id
  , originalList: original.list
  , originalPosition: original.position
  , targetList: target.list
  , targetPosition: target.position
  }
}

export function deleteCard(id, list){
  return {
    type: CardTypes.DELETE_CARD
  , id
  , list
  }
}
