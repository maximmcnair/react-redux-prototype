// Dependencies
import React, { Component, PropTypes } from 'react'
import { ItemTypes } from './ItemTypes'
import { DragSource, DropTarget } from 'react-dnd'
import { pipe } from 'ramda'
import { connect } from 'react-redux'
import Textarea from 'react-textarea-autosize'

// Actions
import * as CardActions from '../actions/CardActions'

/**
 * Card
 */
const cardTarget = {
  hover(props, monitor, component) {

  }
, drop(props, monitor, component) {
    const dragItem = monitor.getItem()
    const hoverItem = props.card

    // Don't replace items with themselves
    if (dragItem._id === hoverItem._id) {
      return
    }

    // Time to actually perform the action
    props.moveCard(dragItem, hoverItem)
  }
}

const cardSource = {
  // canDrag(props) {
  //   // console.log('canDrag', arguments)
  //   return true
  // },

  beginDrag(props) {
    return {
      _id: props.card._id
    , position: props.card.position
    , index: props.index
    , list: props.card.list
    }
  }
}


class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {text: '', edit: false}

    this.showEditableText = this.showEditableText.bind(this)
    this.cardTextKeydown = this.cardTextKeydown.bind(this)
    this.onCardTextChange = this.onCardTextChange.bind(this)
    this.saveCardText = this.saveCardText.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
  }

  // TODO test
  /**
   * Edit text
   */
  showEditableText(){
    this.setState({edit: true, text: this.props.card.text})
  }

  cardTextKeydown(event){
    if(event.charCode == 13){
      event.preventDefault()
      this.saveCardText()
    }
  }

  onCardTextChange(e){
    this.setState({text: e.currentTarget.value})
  }

  saveCardText(){
    const { dispatch } = this.props
    dispatch(CardActions.updateCard(this.props.card._id, this.props.card.list, this.state.text))
    this.setState({text: '', edit: false})
  }

  deleteCard(){
    const { dispatch } = this.props
    dispatch(CardActions.deleteCard(this.props.card._id, this.props.card.list))
  }
  // TODO test

  render(){
    const { isDragging, connectDragSource, connectDropTarget, hovered } = this.props
    const styles = {
      opacity: isDragging ? 0 : 1
    }

    return connectDragSource(connectDropTarget(
      <div className={ hovered ? 'card card-hover' : 'card'} style={styles}>
        {this.state.edit ? (
          <div>
            <Textarea
              className="card-textarea"
              onKeyPress={this.cardTextKeydown}
              onChange={this.onCardTextChange}
              value={this.state.text}
              autoFocus={true}
            />
            <a className="btn btn-sm card-save" onClick={this.saveCardText}>Save</a>
            <i className="fa fa-trash card-delete" onClick={this.deleteCard}></i>
          </div>
        ):(
          <span className="card-text" onDoubleClick={this.showEditableText}>{this.props.card.text}</span>
        )}
      </div>
    ))
  }
}

Card.propTypes =
  { card: PropTypes.object
  , isDragging: PropTypes.bool
  , connectDragSource: PropTypes.func
  , connectDropTarget: PropTypes.func
  , dispatch: PropTypes.func
  , hovered: PropTypes.bool
  }

function select(state) {
  return {}
}

export default pipe(
  connect(select)
, DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  , hovered: monitor.isOver()
  }))
, DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource()
  , isDragging: monitor.isDragging()
  }))
)(Card)
