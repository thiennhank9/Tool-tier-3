import React, { Component } from 'react'
import { compose } from 'recompose'
import actions from './SelectToolActions'

class SelectTool extends Component {
    render(){
        return (
            <div>Loin</div>
        )
    }
}

export default compose(actions)(SelectTool)