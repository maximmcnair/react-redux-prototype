export default {
  // canDrag(props) {
  //   // console.log('canDrag', arguments)
  //   return true
  // },

  beginDrag(props) {
    return {
      _id: props.card.data._id
    , position: props.card.position
    , index: props.index
    , list: props.card.data.list
    }
  }
}
