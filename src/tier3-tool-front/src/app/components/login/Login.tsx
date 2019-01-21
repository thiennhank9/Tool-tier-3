import React, { Component } from 'react'
import { compose } from 'recompose'
import actions from './LoginActions'

class Login extends Component {
  render() {
    return <div>Login</div>
  }
}

export default compose(actions)(Login)
