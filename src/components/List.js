// Dependencies
import React, { Component, PropTypes } from 'react'
import Ramda from 'ramda'
import { connect } from 'react-redux'
import Textarea from 'react-textarea-autosize'

// Components
import Card from './Card'

// Actions
import * as CardActions from '../actions/CardActions'
import * as ListActions from '../actions/ListActions'

// Sockets
const socket = require('socket.io-client')('http://127.0.0.1:3100')

/**
 * List
 */
export class List extends Component {
  constructor(props) {
    super(props)
    this.state = {create: false, text: '', edit: false, title: ''}

    this.newCardKeydown = this.newCardKeydown.bind(this)
    this.onNewCardChange = this.onNewCardChange.bind(this)
    this.showNewCard = this.showNewCard.bind(this)
    this.createNewCard = this.createNewCard.bind(this)

    this.showEditableTitle = this.showEditableTitle.bind(this)
    this.listTitleKeydown = this.listTitleKeydown.bind(this)
    this.onListTitleChange = this.onListTitleChange.bind(this)
    this.saveListTitle = this.saveListTitle.bind(this)
  }

  sortByPosition(cards){
    // sort cards based on _id
    return Ramda.sort(function(a, b) {
      return a.position - b.position
    }, cards)
  }

  /**
   * New Card
   */
  onNewCardChange(e){
    this.setState({text: e.currentTarget.value})
  }

  showNewCard(){
    this.setState({create: true})
  }

  newCardKeydown(event){
    if(event.charCode == 13){
      event.preventDefault()
      this.createNewCard()
    }
  }

  createNewCard(){
    // const { dispatch } = this.props
    // NOTE this generates a fake _id, this would be handled by a database
    // let randomNum = Math.floor(Math.random() * (10000000 - 0 + 1)) + 0
    // dispatch(CardActions.newCard(this.state.text, this.props.list._id, randomNum))
    // TODO test
    socket.emit('NEW_CARD', {
      text: this.state.text
    , list: this.props.list._id
    // , _id: randomNum
    })
    this.setState({text: '', create: false})
  }

  /**
   * Edit title
   */
  showEditableTitle(){
    this.setState({edit: true, title: this.props.list.title})
  }

  listTitleKeydown(event){
    if(event.charCode == 13){
      event.preventDefault()
      this.saveListTitle()
    }
  }

  onListTitleChange(e){
    this.setState({title: e.currentTarget.value})
  }

  saveListTitle(){
    // const { dispatch } = this.props
    // dispatch(ListActions.updateList(this.state.title, this.props.list._id))
    // TODO list
    socket.emit('UPDATE_LIST', {
      title: this.state.title
    , _id: this.props.list._id
    })
    this.setState({title: '', edit: false})
  }

  filterByTag(cards, tag){
    if(tag === 'all tags'){
      return cards
    }else{
      // filter cards
      return cards.filter(card => {
        return card.text.indexOf(tag) !== -1
      })
    }
  }

  /**
   * Render
   */
  render() {
    // create nodes from sorted cards
    let cards = this.filterByTag(this.props.list.cards, this.props.activeTag)
    cards = this.sortByPosition(cards)

    const cardNodes = cards.map(function(card, i){
      console.log(card)
      return (
        <Card
          card={card}
          key={card.data._id}
          index={i}
          id={card.data._id}
          moveCard={this.props.moveCard}
        />
      )
    }.bind(this))

    // let's render!
    return (
      <div className="list" style={{height: this.props.height + 'px'}}>
        { this.state.edit ? (
          <header className="list-header">
            <textarea
              className="list-title-textarea"
              onKeyPress={this.listTitleKeydown}
              onChange={this.onListTitleChange}
              value={this.state.title}
              placeholder="Add name"
              autoFocus={true}
            />
            <a className="btn btn-sm list-header-save" onClick={this.saveListTitle}>Save</a>
          </header>
        ) : (
          <header className="list-header" onDoubleClick={this.showEditableTitle}>
            <h3 className="list-title">{this.props.list.title}</h3>
          </header>
        ) }
        <div className="list-cards" style={{height: (this.props.height  - 57) + 'px'}}>
          {cardNodes}
          {this.state.create ? (
            <div className="card">
              <Textarea
                className="card-textarea"
                onKeyPress={this.newCardKeydown}
                onChange={this.onNewCardChange}
                value={this.state.text}
                autoFocus={true}
              />
              <a className="btn btn-sm card-save" onClick={this.createNewCard}>Save</a>
            </div>
          ) : (
            <div className="list-btn">
              <span
                className="btn btn-sm"
                onClick={this.showNewCard}
              >Create task</span>
            </div>
          ) }
        </div>
      </div>
    )
  }
}

List.propTypes =
  { title: PropTypes.string
  , height: PropTypes.number
  , _id: PropTypes.string
  , activeTag: PropTypes.string
  , cards: PropTypes.array
  , dispatch: PropTypes.func
  , moveCard: PropTypes.func
  , list: PropTypes.object
  }

export function select(state) {
  return {}
}

export default connect(select)(List)
