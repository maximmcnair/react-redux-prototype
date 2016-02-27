// Dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Components
import List from '../components/List'

// Actions
import * as CardActions from '../actions/CardActions'

/**
 * Board Component
 */
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
  }

  moveCard(dragItem, hoverItem){
    const { dispatch } = this.props
    dispatch(CardActions.moveCard(dragItem, hoverItem))
  }

  render() {
    const { board } = this.props

    return (
      <section className="board">
        <header className="board-header">
          <h2 className="board-header-title">{board.title}</h2>
          <h3 className="board-header-client">{board.client}</h3>
        </header>
        <div className="board-lists">
          {board.lists.map((list, i) => {
            return (
              <List
              list={list}
              key={list._id}
              moveCard={this.moveCard}
              />
            )
          })}
          <div className="list-new">
            <div className="list-btn">
              <span className="btn btn-sm">Create list</span>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Board.propTypes =
  { board: PropTypes.object
  , dispatch: PropTypes.func
  }

function select(state) {
  return {
    board: state.board
  }
}

export default connect(select)(DragDropContext(HTML5Backend)(Board))
