import React from 'react'

var Loading = React.createClass({
  render: function() {
    return (
      <div className="loading-spinner">
        <div id="loading-spinner__circle--1" className="loading-spinner__circle"></div>
        <div id="loading-spinner__circle--2" className="loading-spinner__circle"></div>
        <div id="loading-spinner__circle--3" className="loading-spinner__circle"></div>
        <div id="loading-spinner__circle--4" className="loading-spinner__circle"></div>
        <div id="loading-spinner__circle--5" className="loading-spinner__circle"></div>
        <div id="loading-spinner__circle--6" className="loading-spinner__circle"></div>
        <div id="loading-spinner__circle--7" className="loading-spinner__circle"></div>
        <div id="loading-spinner__circle--8" className="loading-spinner__circle"></div>
      </div>
    )
  }
})

export default Loading
