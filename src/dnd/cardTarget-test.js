// Dependencies
import test from 'tape'
import sinon from 'sinon'

import cardTarget from './cardTarget'

/**
 * cardTarget test
 */
test('drop()', t => {
  let monitor =
    { getItem: () => {
        return { _id: '1342' }
      }
    }
  let component

  // spy on .getItem
  let spyMonitor = sinon.spy(monitor, 'getItem')

  let validProps =
    { card:
      { _id: '1422'
      }
    , moveCard: () => {}
    }
  let spyValidMoveCard = sinon.spy(validProps, 'moveCard')
  // call `.drop` with validProps
  cardTarget.drop(validProps, monitor, component)

  t.equal(spyMonitor.callCount, 1, 'should call monitor.getItem')

  t.equal(spyValidMoveCard.callCount, 1, 'should call props.moveCard')
  t.looseEqual(spyValidMoveCard.args[0][0], {_id: '1342'}, 'should call props.moveCard with dragItem')
  t.looseEqual(spyValidMoveCard.args[0][1], {_id: '1422'}, 'should call props.moveCard with hoverItem')

  // create invalidProps (same id as monitor.getItem)
  let invalidProps =
    { card:
      { _id: '1342'
      }
    , moveCard: () => {}
    }

  let spyInvalidMoveCard = sinon.spy(invalidProps, 'moveCard')

  // call `.drop` with invalidProps
  cardTarget.drop(invalidProps, monitor, component)
  t.equal(spyInvalidMoveCard.callCount, 0, 'should not call props.moveCard if dragItem and hoverItem have the same id')

  t.end()
})
