// Dependencies
import * as CardTypes from './CardTypes'

/**
 * Action creators
 */
export function newCard(){
 return {
   type: CardTypes.NEW_CARD
 }
}
export function updateCard(id, text){
  return {
    type: CardTypes.UPDATE_CARD
  , id
  , text
  }
}
export function moveCard(original, target){
 return {
   type: CardTypes.MOVE_CARD
 , originalId: original._id
 , originalList: original.list
 , originalPosition: original.position
 , targetList:  original.list
 , targetPosition: original.position
 }
}

export function deleteCard(id){
  return {
    type: CardTypes.DELETE_CARD
  , id
  }
}