// Dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Components
import List from '../components/List'

// Actions
import * as CardActions from '../actions/CardActions'
import * as ListActions from '../actions/ListActions'

/**
 * Board Component
 */
class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {create: false, title: ''}
    this.moveCard = this.moveCard.bind(this)
    this.showNewList = this.showNewList.bind(this)
    this.onNewListChange = this.onNewListChange.bind(this)
    this.newListKeydown = this.newListKeydown.bind(this)
  }

  // TODO test
  onNewListChange(e){
    this.setState({title: e.currentTarget.value})
  }

  showNewList(){
    this.setState({create: true})
  }

  newListKeydown(event){
    if(event.charCode == 13){
      const { dispatch } = this.props
      event.preventDefault()
      let randomNum = Math.floor(Math.random() * (10000000 - 0 + 1)) + 0
      dispatch(ListActions.newList(this.state.title, randomNum))
      this.setState({title: '', create: false})
    }
  }

  moveCard(dragItem, hoverItem){
    const { dispatch } = this.props
    dispatch(CardActions.moveCard(dragItem, hoverItem))
  }
  // TODO test

  updateWidth(listsLength){
    let listWidth = 272
      , paddingRight = 28
    return (listsLength + 1) * listWidth + paddingRight
  }

  render() {
    const { board } = this.props

    let boardListScrollStyle = {width: this.updateWidth(board.lists.length) + 'px' }

    // TODO test
    var body = document.body
      , html = document.documentElement

    var height = Math.max( body.scrollHeight, body.offsetHeight,
                           html.clientHeight, html.scrollHeight,
                           html.offsetHeight )

    var boardListWrapperStyle = {height: height - 100 + 'px', background: 'red'}
      , boardListStyle = {height: height - 100 - (28 * 2) + 'px'}
    // TODO test

    return (
      <section className="board">
        <header className="board-header">
          <h2 className="board-header-title">{board.title}</h2>
          <h3 className="board-header-client">{board.client}</h3>
        </header>
        <div className="board-lists" height={boardListWrapperStyle}>
          <div className="board-lists-scroll" style={boardListScrollStyle}>
            {board.lists.map((list, i) => {
              return (
                <List
                  list={list}
                  key={list._id}
                  moveCard={this.moveCard}
                  height={height - 100 - (28 * 2)}
                />
              )
            })}
            <div className="list-new" style={boardListStyle}>
              {this.state.create ? (
                <header className="list-header">
                  <textarea
                    className="list-title-textarea"
                    onKeyPress={this.newListKeydown}
                    onChange={this.onNewListChange}
                    value={this.state.title}
                    placeholder="Add name"
                    autoFocus={true}
                  />
                </header>
              ) : (
                <div className="list-btn">
                  <span className="btn btn-sm" onClick={this.showNewList}>Create list</span>
                </div>
              ) }
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
export let undecorated = Board
