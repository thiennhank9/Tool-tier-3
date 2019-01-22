import React, { Component } from 'react'
import { compose } from 'recompose'
import actions from './ManageConnectionsActions'

class ManageConnections extends Component {
    render(){
        return (
            <div>Loin</div>
        )
    }
}

export default compose(actions)(ManageConnections)