// Dependencies
import React, { Component, PropTypes } from 'react'

/**
 * Card
 */
export default class Card extends Component {
  render(){
    return (
      <div className="card">
        {this.props.card.title}
      </div>
    )
  }
}

Card.propTypes =
  { card: PropTypes.object
  }
