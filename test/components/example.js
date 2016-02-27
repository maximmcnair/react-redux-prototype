// Dependencies
import React, { Component, PropTypes } from 'react'

import BlankComponent from '../mocks/BlankComponent'

export default class MyFancyWrapperComponent extends React.Component {

    render() {
        return (<div className="wrapper-style">
            <BlankComponent {...this.props} />
        </div>);
    }
}
