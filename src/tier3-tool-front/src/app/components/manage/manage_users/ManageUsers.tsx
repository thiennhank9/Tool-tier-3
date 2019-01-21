import React, { Component } from 'react'
import { compose } from 'recompose'
import actions from './ManageUsersActions'

class ManageUsers extends Component {
    render(){
        return (
            <div>Loin</div>
        )
    }
}

export default compose(actions)(ManageUsers)