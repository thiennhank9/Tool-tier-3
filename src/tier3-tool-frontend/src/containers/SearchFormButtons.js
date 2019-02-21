import React, { Component } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { compose } from 'recompose';
import actions from './WarehouseAuthorizationsFormActions';
import { observer } from 'mobx-react';
import SearchForm from 'src/containers/SearchForm';

@observer
class WarehouseAuthorizationsForm extends Component {