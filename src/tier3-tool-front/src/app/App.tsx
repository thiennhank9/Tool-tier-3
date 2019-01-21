import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

class Todo {
  @observable str = 'nv';
}

const todo = new Todo();

@observer
class App extends Component {
  render() {
    return <div>{todo.str}</div>;
  }
}

export default App;
