// Dependencies
import React, { Component, PropTypes } from 'react'
import Ramda from 'ramda'
import { connect } from 'react-redux'
import Textarea from 'react-textarea-autosize'

// Components
import Card from './Card'

// Actions
import * as CardActions from '../actions/CardActions'

/**
 * List
 */
class List extends Component {
  constructor(props) {
    super(props)
    this.state = {create: false, text: ''}
    this.newCardKeydown = this.newCardKeydown.bind(this)
    this.onNewCardChange = this.onNewCardChange.bind(this)
    this.showNewCard = this.showNewCard.bind(this)
  }

  sortByPosition(cards){
    // sort cards based on _id
    return Ramda.sort(function(a, b) {
      return a.position - b.position
    }, cards)
  }

  onNewCardChange(e){
    this.setState({text: e.currentTarget.value})
  }

  showNewCard(){
    this.setState({create: true})
  }

  newCardKeydown(event){
    if(event.charCode == 13){
      const { dispatch } = this.props
      event.preventDefault()
      let randomNum = Math.floor(Math.random() * (10000000 - 0 + 1)) + 0
      dispatch(CardActions.newCard(this.state.text, this.props.list._id, randomNum))
      this.setState({text: '', create: false})
    }
  }

  render() {
    // create nodes from sorted cards
    const cardNodes = this.sortByPosition(this.props.list.cards).map(function(card, i){
      return (
        <Card
          card={card}
          key={card._id}
          index={i}
          id={card._id}
          moveCard={this.props.moveCard}
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
          {this.state.create ? (
            <div className="card">
              <Textarea
                className="card-textarea"
                onKeyPress={this.newCardKeydown}
                onChange={this.onNewCardChange}
                value={this.state.text}
                autoFocus={true}
              />
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
  , _id: PropTypes.string
  , cards: PropTypes.array
  , moveCard: PropTypes.func
  , list: PropTypes.object
  }

function select(state) {
  return {}
}

export default connect(select)(List)

export let undecorated = Card
