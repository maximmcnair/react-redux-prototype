// Dependencies
import Ramda from 'ramda'

// Types
import * as CardTypes from '../actions/CardTypes'
import * as ListTypes from '../actions/ListTypes'
import * as BoardTypes from '../actions/BoardTypes'

/**
 * Board Reducer
 */
const BoardReducer = (state = {}, action) => {
  // Clone state
  var state = Ramda.clone(state)

  switch (action.type) {
    case BoardTypes.RECIEVE_BOARD:
      state = action.board
      break

    case CardTypes.NEW_CARD:
      console.log('NEW_CARD', action)
      // find list
      let list1 = state.lists.find((list) => {
        return list._id === action.list
      })
      // push new card
      list1.cards.push({
        position: action.position
      , data:
        { text: action.text
        , list: action.list
        , _id: action.id
        }
      })
      break

    case CardTypes.UPDATE_CARD:
      // console.log('UPDATE_CARD', action)
      // find list
      let list2 = state.lists.find((list) => {
        return list._id === action.list
      })
      let card2 = list2.cards.find(card => {
        return card.data._id === action.id
      })
      card2.data.text = action.text
      break

    case CardTypes.MOVE_CARD:
      // console.log('MOVE_CARD', action)
      // get original list
      let originalList = state.lists.find((list) => {
        return list._id === action.originalList
      })
      // get card details
      let selectedCard
      let selectedCardIndex
      originalList.cards.forEach((card, i) => {
        if(card._id === action.originalId){
          selectedCard = card
          selectedCardIndex = i
        }
      })
      // remove from original list
      originalList.cards.splice(selectedCardIndex, 1)

      // find all card models to update
      let originalListCardModels = originalList.cards.filter((card) => {
          return card.position >= action.originalPosition
      })
      // update original list positions
      originalListCardModels.forEach((card) => {
        card.position = card.position - 1
      })

      // add to target list
      let targetList = state.lists.find((list) => {
        return list._id === action.targetList
      })

      // update selectedCard's list id
      selectedCard.list = targetList._id
      // update selectedCard's position
      selectedCard.position = action.targetPosition

      // find all card models to update
      let targetListCardModels = targetList.cards.filter((card) => {
          return card.position >= action.targetPosition
      })
      // update target list positions
      targetListCardModels.forEach((card) => {
        card.position = card.position + 1
      })

      // debugPositions(targetListCardModels)

      // add to target list
      targetList.cards.push(selectedCard)

      break

    case CardTypes.DELETE_CARD:
      console.log(CardTypes.DELETE_CARD, action)
      // find list
      let list4 = state.lists.find((list) => {
        console.log(list._id, action.list)
        return list._id === action.list
      })
      let cardIndex
      list4.cards.forEach((card, i) => {
        if(card.data._id === action.id){
          cardIndex = i
        }
      })
      // remove card from list
      if(cardIndex !== undefined) list4.cards.splice(cardIndex, 1)
      // TODO update card positions
      break

    case ListTypes.NEW_LIST:
      state.lists.push({
        title: action.title
      , _id: action.id
      , cards: []
      })
      break

    case ListTypes.UPDATE_LIST:
      // find list
      let list5 = state.lists.find((list) => {
        return list._id === action.id
      })
      list5.title = action.title
      break
  }
  return state
}

export default BoardReducer
