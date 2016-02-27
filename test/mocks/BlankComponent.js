// Dependencies
import React, { Component, PropTypes } from 'react'

/**
 * BlankComponent
 * @extends {React.Component}
 */
export default class BlankComponent extends React.Component {
  /**
   * @returns {XML}
   */
  render() {
    return (
      <div>{this.props}</div>
    )
  }

}

// export default function React.createClass({
//   /**
//    * @returns {XML}
//    */
//   render() {
//     return (
//       <div>{this.props}</div>
//     )
//   }
// })
