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
export class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {create: false, title: ''}

    this.showNewList = this.showNewList.bind(this)
    this.onNewListChange = this.onNewListChange.bind(this)
    this.createNewList = this.createNewList.bind(this)
    this.newListKeydown = this.newListKeydown.bind(this)
    this.moveCard = this.moveCard.bind(this)
  }

  onNewListChange(e){
    this.setState({title: e.currentTarget.value})
  }

  showNewList(){
    this.setState({create: true})
  }

  createNewList(){
    const { dispatch } = this.props
    let randomNum = Math.floor(Math.random() * (10000000 - 0 + 1)) + 0
    dispatch(ListActions.newList(this.state.title, randomNum))
    this.setState({title: '', create: false})
  }

  newListKeydown(event){
    if(event.charCode == 13){
      event.preventDefault()
      this.createNewList()
    }
  }

  moveCard(dragItem, hoverItem){
    const { dispatch } = this.props
    dispatch(CardActions.moveCard(dragItem, hoverItem))
  }

  updateWidth(listsLength){
    let listWidth = 272
      , paddingRight = 28
    return (listsLength + 1) * listWidth + paddingRight
  }

  // TODO test
  getMaxHeight(){
    var body = document.body
      , html = document.documentElement

    return Math.max(body.scrollHeight
    , body.offsetHeight
    , html.clientHeight
    , html.scrollHeight
    , html.offsetHeight
    )
  }

  render() {
    const { board } = this.props

    let boardListScrollStyle = {width: this.updateWidth(board.lists.length) + 'px' }
    let height = this.getMaxHeight()

    var boardListWrapperStyle = {height: height - 100 + 'px', background: 'red'}
      , boardListStyle = {height: height - 100 - (28 * 2) + 'px'}

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
                  <a className="btn btn-sm list-header-save" onClick={this.createNewList}>Save</a>
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

export function select(state) {
  return {
    board: state.board
  }
}

export default connect(select)(DragDropContext(HTML5Backend)(Board))
