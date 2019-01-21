import React, { Component } from 'react'
import { compose } from 'recompose'
import actions from './SelectConnectionActions'

class SelectConnection extends Component {
    render(){
        return (
            <div>Loin</div>
        )
    }
}

export default compose(actions)(SelectConnection)