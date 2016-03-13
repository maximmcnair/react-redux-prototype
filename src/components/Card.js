// Dependencies
import React, { Component, PropTypes } from 'react'
import { ItemTypes } from './ItemTypes'
import { DragSource, DropTarget } from 'react-dnd'
import { pipe } from 'ramda'
import { connect } from 'react-redux'
import Textarea from 'react-textarea-autosize'

// Actions
import * as CardActions from '../actions/CardActions'

// DnD
import cardTarget from '../dnd/cardTarget'
import cardSource from '../dnd/cardSource'

// Sockets
const socket = require('socket.io-client')('http://127.0.0.1:3100')

/**
 * Card
 */
export class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {text: '', edit: false}

    this.showEditableText = this.showEditableText.bind(this)
    this.cardTextKeydown = this.cardTextKeydown.bind(this)
    this.onCardTextChange = this.onCardTextChange.bind(this)
    this.saveCardText = this.saveCardText.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
  }

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
    dispatch(CardActions.updateCard(this.props.card.data._id, this.props.card.data.list, this.state.text))
    // TODO test
    socket.emit('UPDATE_CARD', {
      _id: this.props.card.data._id
    , list: this.props.card.data.list
    , text: this.state.text
    })
    this.setState({text: '', edit: false})
  }

  deleteCard(){
    const { dispatch } = this.props
    dispatch(CardActions.deleteCard(this.props.card._id, this.props.card.list))
    // TODO test
    socket.emit('DELETE_CARD', {
      _id: this.props.card.data._id
    , list: this.props.card.data.list
    })
  }

  generateCardClass(){
    if(this.props.hovered){
      return 'card card-hover'
    }else{
      return 'card'
    }
  }

  generateCardStyle(){
    if(this.props.isDragging){
      return {opacity: 0}
    }else{
      return {opacity: 1}
    }
  }

  /**
   * Render
   */
  render(){
    const { connectDragSource, connectDropTarget } = this.props

    let cardClass = this.generateCardClass()
    let cardStyle = this.generateCardStyle()

    return connectDragSource(connectDropTarget(
      <div className={cardClass} style={cardStyle}>
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
          <span className="card-text" onDoubleClick={this.showEditableText}>{this.props.card.data.text}</span>
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

export function select(state) {
  return {}
}

/* istanbul ignore next: base method */
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
