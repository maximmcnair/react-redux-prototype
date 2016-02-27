// Dependencies
import React, { Component, PropTypes } from 'react'
import { ItemTypes } from './ItemTypes'
import { DragSource, DropTarget } from 'react-dnd'
import { pipe } from 'ramda'

// import prefix from 'react-prefixer'

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
  render(){
    const { isDragging, connectDragSource, connectDropTarget, hovered } = this.props
    const styles = {
      borderTop: hovered ? '4px solid blue' : '1px solid #CFD6E7'
    , opacity: isDragging ? 0 : 1
    }

    return connectDragSource(connectDropTarget(
      <div className="card" style={styles}>
        {this.props.card.text}
      </div>
    ))
  }
}

Card.propTypes =
  { card: PropTypes.object
  , isDragging: PropTypes.bool
  , connectDragSource: PropTypes.func
  , connectDropTarget: PropTypes.func
  , hovered: PropTypes.bool
  }

export default pipe(
  DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  , hovered: monitor.isOver()
  }))
, DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource()
  , isDragging: monitor.isDragging()
  }))
)(Card)
