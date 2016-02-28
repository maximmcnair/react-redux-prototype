export default {
  drop(props, monitor, component) {
    const dragItem = monitor.getItem()
    const hoverItem = props.card

    // Don't replace items with themselves
    if (dragItem._id === hoverItem._id) {
      return
    }

    // Time to actually perform the action
    props.moveCard(dragItem, hoverItem)
  }
}
