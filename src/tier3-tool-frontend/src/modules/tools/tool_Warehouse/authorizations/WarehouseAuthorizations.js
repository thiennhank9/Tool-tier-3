import React, { Component } from 'react';
// import { Tabs, Tab, Badge, Button, Form } from 'react-bootstrap';

import { compose } from 'recompose';
import actions from './WarehouseAuthorizationsActions';

class WarehouseAuthorizations extends Component{
    render(){
        return (
            <div>WarehouseClients</div>
        )
    }
}

export default compose(actions)(WarehouseAuthorizations)