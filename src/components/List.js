// Dependencies
import React, { Component, PropTypes } from 'react'
import Ramda from 'ramda'
import { connect } from 'react-redux'

// Components
import Card from './Card'

/**
 * List
 */
class List extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // sort cards based on _id
    var sortedCards = Ramda.sort(function(a, b) {
      return a.position - b.position
    }, this.props.list.cards)

    // create nodes from sorted cards
    const cardNodes = sortedCards.map(function(card, i){
      return (
        <Card
          card={card}
          key={card._id}
          index={i}
          id={card._id}
          updatePositions={this.updatePositions}
        />
      )
    }.bind(this))

    // let's render!
    return (
      <div className="list">
        <header className="list-header">
          <h3 className="list-title">{this.props.list.title}</h3>
        </header>
        <div className="list-cards">
          {cardNodes}
          <div className="list-btn">
            <span className="btn btn-sm">Create task</span>
          </div>
        </div>
      </div>
    )
  }
}

List.propTypes =
  { title: PropTypes.string
  , _id: PropTypes.string
  , cards: PropTypes.array
  // , moveCard: PropTypes.func
  , dispatch: PropTypes.func
  , list: PropTypes.object
  , connectDropTarget: PropTypes.func
  }

export default List
