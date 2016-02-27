// Dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Components
import List from '../components/List'

/**
 * Board Component
 */
// @connect((state) => ({lists: state}))
class Board extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { lists } = this.props

    console.log('lists', lists)

    return (
      <section className="board">
        <header className="board-header">
          <h2 className="board-header-title">Fresh8 Admin</h2>
          <h3 className="board-header-client">Connected Ventures</h3>
        </header>
        <div className="board-lists">
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
  { lists: PropTypes.array
  }

function select(state) {
  return {
    lists: state
  }
}

export default connect(select)(Board)


  // {lists.map((list, i) => {
  //   return (
  //     <List
  //       list={list}
  //       key={list._id}
  //       moveCard={this.moveCard}
  //     />
  //   )
  // })}
