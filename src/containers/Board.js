// Dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Components
import List from '../components/List'

/**
 * Board Component
 */
class Board extends React.Component {
  constructor(props) {
    super(props)
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
  }

function select(state) {
  return {
    board: state.board
  }
}

export default connect(select)(Board)
